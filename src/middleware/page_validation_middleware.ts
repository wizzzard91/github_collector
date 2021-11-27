import { NextFunction, Request, Response } from 'express'
import { Logger } from '../modules/logger'
const log = new Logger('middleware.pageValidationMiddleware')

export function pageValidationMiddleware (req: Request, res: Response, next: NextFunction): void {
  res.locals.page = parseInt(req.params.page, 10)
  if (isNaN(res.locals.page) || res.locals.page < 1) { // pagination starts with 1
    res.status(400).send('400 Bad Request')
    log.error(`incorrect page ${req.params.page}`)
    return
  }
  next()
}
