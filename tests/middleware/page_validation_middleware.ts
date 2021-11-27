import {createMock} from "ts-auto-mock";
import { pageValidationMiddleware } from "../../src/middleware/page_validation_middleware";
import {NextFunction, Request, Response} from "express";

describe('page_validation_middleware', () => {
  it('should return 400 status code for page as string', () => {
    const middleware = pageValidationMiddleware

    const reqMock: Request = createMock<Request>()
    reqMock.params.page = "Bad string"
    const resMock: Response = createMock<Response>()
    resMock.locals = {}
    const nextMock: NextFunction = createMock<NextFunction>();

    middleware(reqMock, resMock, nextMock)
    expect(nextMock).not.toHaveBeenCalled();
    expect(resMock.status).toHaveBeenCalledWith(400);
  })

  it('should return 400 status code for page as negative number', () => {
    const middleware = pageValidationMiddleware

    const reqMock: Request = createMock<Request>()
    reqMock.params.page = "-10"
    const resMock: Response = createMock<Response>()
    resMock.locals = {}
    const nextMock: NextFunction = createMock<NextFunction>();

    middleware(reqMock, resMock, nextMock)
    expect(nextMock).not.toHaveBeenCalled();
    expect(resMock.status).toHaveBeenCalledWith(400);
  })


  it('should return 400 status code for fraction page', () => {
    const middleware = pageValidationMiddleware

    const reqMock: Request = createMock<Request>()
    reqMock.params.page = "-12.34"
    const resMock: Response = createMock<Response>()
    resMock.locals = {}
    const nextMock: NextFunction = createMock<NextFunction>();

    middleware(reqMock, resMock, nextMock)
    expect(nextMock).not.toHaveBeenCalled();
    expect(resMock.status).toHaveBeenCalledWith(400);
  })

  it('should return 200 status code for valid page number', () => {
    const middleware = pageValidationMiddleware

    const reqMock: Request = createMock<Request>()
    reqMock.params.page = "18"
    const resMock: Response = createMock<Response>()
    resMock.locals = {}
    const nextMock: NextFunction = createMock<NextFunction>();

    middleware(reqMock, resMock, nextMock)
    expect(nextMock).toHaveBeenCalled();
  })
})

