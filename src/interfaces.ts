export interface Repo {
  id: string
  name: string
  description: string
  url: string
}

export interface PageInfo {
  startCursor: string
  endCursor: string
  hasNextPage: boolean
  hasPreviousPage: boolean
}

export interface Pagination {
  queryString: string,
  pageCount: number,
  pgKeyword: string
  pgString: string
}

export interface State {
  userName: string
  repositories: Repo[]
  totalCount: number
  pageInfo: PageInfo
}
