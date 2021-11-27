import express from 'express'
import config from 'config'
import { router } from './controllers/users'

import { Logger } from './modules/logger'

const host: string = config.server.host as string
const port: number = config.server.port as number

const log = new Logger('server')
const app = express()

app.use('/api/v1/language', router)

app.listen(port, () => {
  log.info(`Server started on ${host}:${port}`)
})
