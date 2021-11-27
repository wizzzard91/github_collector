import { request } from '@octokit/request'
import config from 'config'
import { User } from '../types/user'
import { GithubUsersResponse, GithubSearchResponse, Item } from '../types/github_response'
import { OctokitResponse } from '@octokit/types'
import { LoginSearchResult } from '../types/search_result'

export class GithubApiDAL {
  key: string
  perPage: number

  constructor () {
    this.key = config.credentials.github.apiKey
  }

  async searchUsers (language: string, page: number, pageLength: number): Promise<LoginSearchResult> {
    // https://docs.github.com/en/rest/reference/search#search-repositories
    const searchedData: LoginSearchResult = {
      totalCount: 0,
      logins: []
    }
    const response: OctokitResponse<GithubSearchResponse> = await request('GET /search/repositories', {
      q: `q=language:${language}`,
      per_page: pageLength,
      page: page,
      headers: {
        accept: 'application/vnd.github.v3+json',
        authorization: `token ${this.key}`
      }
    })
    if (response.status !== 200 && response.status !== 304) {
      throw { message: `Github API error: ${response.status}` }
    }

    response.data.items.forEach((item: Item) => {
      searchedData.logins.push(item.owner.login)
    })
    searchedData.totalCount = response.data.total_count
    return searchedData
  }

  async getUserFollowersNumber (username: string): Promise<User> {
    // Using binary search for followers detection
    const response: OctokitResponse<GithubUsersResponse> = await request(`GET /users/${username}`, {
      headers: {
        accept: 'application/vnd.github.v3+json',
        authorization: `token ${this.key}`
      }
    })

    if (response.status !== 200 && response.status !== 304) {
      throw { message: `Github API error: ${response.status}` }
    }

    return {
      username: response.data.login,
      name: response.data.name,
      avatarUrl: response.data.avatar_url,
      followers: response.data.followers
    }
  }
}
