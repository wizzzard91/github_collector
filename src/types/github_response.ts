export interface Item {
  owner: {
    login: string
  }
}

export interface GithubSearchResponse {
  total_count: number
  incomplete_results: boolean
  items: Item[]
}

export interface GithubUsersResponse {
  login: string
  name: string
  avatar_url: string
  followers: number
}
