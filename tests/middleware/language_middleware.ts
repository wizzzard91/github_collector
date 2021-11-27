import {createMock} from "ts-auto-mock";
import { languageMiddleware } from "../../src/middleware/language_middleware";
import {NextFunction, Request, Response} from "express";

describe('language_middleware', () => {
  it('should return 400 status code for empty language', () => {
    const middleware = languageMiddleware

    const reqMock: Request = createMock<Request>()
    reqMock.params.language = ""
    const resMock: Response = createMock<Response>()
    resMock.locals = {}
    const nextMock: NextFunction = createMock<NextFunction>();

    middleware(reqMock, resMock, nextMock)
    expect(nextMock).not.toHaveBeenCalled();
    expect(resMock.status).toHaveBeenCalledWith(400);
  })

  it('should return 400 status code for undefined language page', () => {
    const middleware = languageMiddleware

    const reqMock: Request = createMock<Request>()
    const resMock: Response = createMock<Response>()
    resMock.locals = {}
    const nextMock: NextFunction = createMock<NextFunction>();

    middleware(reqMock, resMock, nextMock)
    expect(nextMock).not.toHaveBeenCalled();
    expect(resMock.status).toHaveBeenCalledWith(400);
  })

  it('should return 200 status code for valid language', () => {
    const middleware = languageMiddleware

    const reqMock: Request = createMock<Request>()
    reqMock.params.language = "python"
    const resMock: Response = createMock<Response>()
    resMock.locals = {}
    const nextMock: NextFunction = createMock<NextFunction>();

    middleware(reqMock, resMock, nextMock)
    expect(nextMock).toHaveBeenCalled();
  })
})

