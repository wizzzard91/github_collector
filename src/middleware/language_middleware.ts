import { NextFunction, Request, Response } from 'express'
import { Logger } from '../modules/logger'
const log = new Logger('middleware.languageMiddleware')

export function languageMiddleware (req: Request, res: Response, next: NextFunction): void {
  if (!req.params.language) { // pagination starts with 1
    res.status(400).send('400 Bad Request')
    log.error(`incorrect language ${req.params.language}`)
    return
  }
  res.locals.language = req.params.language
  next()
}
