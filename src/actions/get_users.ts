import { GithubApiDAL } from '../data_access_layer/github_api'
import { User } from '../types/user'
import { UserSearchResult, LoginSearchResult } from '../types/search_result'
import { Logger } from '../modules/logger'

const log = new Logger('actions.get_user')

export class GetUsersAction {
  dal: GithubApiDAL
  pageLength: number

  constructor () {
    this.dal = new GithubApiDAL() // TODO should be injected via dependency injection
    this.pageLength = 30 // default value
  }

  async getUsersForLanguage (language: string, page: number): Promise<UserSearchResult> {
    const result: UserSearchResult = {
      msg: '',
      totalCount: 0,
      users: []
    }
    try {
      const usersLogins: LoginSearchResult = await this.dal.searchUsers(language, page, this.pageLength)

      const userFollowersPromises: Array<Promise<User>> = []
      usersLogins.logins.forEach((login: string) => {
        userFollowersPromises.push(this.dal.getUserFollowersNumber(login))
      })

      const users: User[] = await Promise.all(userFollowersPromises)
      result.users = users
      result.totalCount = usersLogins.totalCount
      result.msg = 'ok'
    } catch (err) {
      result.msg = err.name
      log.error(err)
    }
    return result
  }
}
