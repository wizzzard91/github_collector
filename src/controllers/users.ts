import { Request, Response, Router } from 'express'
import { Logger } from '../modules/logger'
import { languageMiddleware } from '../middleware/language_middleware'
import { pageValidationMiddleware } from '../middleware/page_validation_middleware'
import { GetUsersAction } from '../actions/get_users'
import { UserSearchResult } from '../types/search_result'

const log = new Logger('controllers.users')

const getUsers = new GetUsersAction()

const router: Router = Router()
router.get('/(:language)/page/(:page)/users',
  languageMiddleware,
  pageValidationMiddleware,
  async (req: Request, res: Response): Promise<void> => {
    const { language, page } = res.locals
    log.debug(`Requesting ${language} users, page ${page}`)

    const users: UserSearchResult = await getUsers.getUsersForLanguage(language, page)
    res.json(users)
  })

export { router }
