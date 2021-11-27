'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
const ts_auto_mock_1 = require('ts-auto-mock')
const language_middleware_1 = require('../../src/middleware/language_middleware')
describe('language_middleware', () => {
  it('should return 400 status code for empty language', () => {
    const middleware = language_middleware_1.languageMiddleware
    const reqMock = (0, ts_auto_mock_1.createMock)()
    reqMock.params.language = ''
    const resMock = (0, ts_auto_mock_1.createMock)()
    resMock.locals = {}
    const nextMock = (0, ts_auto_mock_1.createMock)()
    middleware(reqMock, resMock, nextMock)
    expect(nextMock).not.toHaveBeenCalled()
    expect(resMock.status).toHaveBeenCalledWith(400)
  })
  it('should return 400 status code for undefined language page', () => {
    const middleware = language_middleware_1.languageMiddleware
    const reqMock = (0, ts_auto_mock_1.createMock)()
    const resMock = (0, ts_auto_mock_1.createMock)()
    resMock.locals = {}
    const nextMock = (0, ts_auto_mock_1.createMock)()
    middleware(reqMock, resMock, nextMock)
    expect(nextMock).not.toHaveBeenCalled()
    expect(resMock.status).toHaveBeenCalledWith(400)
  })
  it('should return 200 status code for valid language', () => {
    const middleware = language_middleware_1.languageMiddleware
    const reqMock = (0, ts_auto_mock_1.createMock)()
    reqMock.params.language = 'python'
    const resMock = (0, ts_auto_mock_1.createMock)()
    resMock.locals = {}
    const nextMock = (0, ts_auto_mock_1.createMock)()
    middleware(reqMock, resMock, nextMock)
    expect(nextMock).toHaveBeenCalled()
  })
})
