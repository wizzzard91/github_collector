import { User } from './user'

export interface LoginSearchResult {
  totalCount: number
  logins: string[]
}

export interface UserSearchResult {
  totalCount: number
  msg: string
  users: User[]
}
