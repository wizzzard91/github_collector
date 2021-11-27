'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
const ts_auto_mock_1 = require('ts-auto-mock')
const page_validation_middleware_1 = require('../../src/middleware/page_validation_middleware')
describe('page_validation_middleware', () => {
  it('should return 400 status code for page as string', () => {
    const middleware = page_validation_middleware_1.pageValidationMiddleware
    const reqMock = (0, ts_auto_mock_1.createMock)()
    reqMock.params.page = 'Bad string'
    const resMock = (0, ts_auto_mock_1.createMock)()
    resMock.locals = {}
    const nextMock = (0, ts_auto_mock_1.createMock)()
    middleware(reqMock, resMock, nextMock)
    expect(nextMock).not.toHaveBeenCalled()
    expect(resMock.status).toHaveBeenCalledWith(400)
  })
  it('should return 400 status code for page as negative number', () => {
    const middleware = page_validation_middleware_1.pageValidationMiddleware
    const reqMock = (0, ts_auto_mock_1.createMock)()
    reqMock.params.page = '-10'
    const resMock = (0, ts_auto_mock_1.createMock)()
    resMock.locals = {}
    const nextMock = (0, ts_auto_mock_1.createMock)()
    middleware(reqMock, resMock, nextMock)
    expect(nextMock).not.toHaveBeenCalled()
    expect(resMock.status).toHaveBeenCalledWith(400)
  })
  it('should return 400 status code for fraction page', () => {
    const middleware = page_validation_middleware_1.pageValidationMiddleware
    const reqMock = (0, ts_auto_mock_1.createMock)()
    reqMock.params.page = '-12.34'
    const resMock = (0, ts_auto_mock_1.createMock)()
    resMock.locals = {}
    const nextMock = (0, ts_auto_mock_1.createMock)()
    middleware(reqMock, resMock, nextMock)
    expect(nextMock).not.toHaveBeenCalled()
    expect(resMock.status).toHaveBeenCalledWith(400)
  })
  it('should return 200 status code for valid page number', () => {
    const middleware = page_validation_middleware_1.pageValidationMiddleware
    const reqMock = (0, ts_auto_mock_1.createMock)()
    reqMock.params.page = '18'
    const resMock = (0, ts_auto_mock_1.createMock)()
    resMock.locals = {}
    const nextMock = (0, ts_auto_mock_1.createMock)()
    middleware(reqMock, resMock, nextMock)
    expect(nextMock).toHaveBeenCalled()
  })
})
