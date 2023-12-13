export interface ICreateArticlePayload {
  title: string
  content?: string
  tags?: string[]
  isPublic?: boolean
}

export interface IUpdateArticlePayload {
  title?: string
  content?: string
  tags?: string[]
  isPublic?: boolean
}

export interface IListArticleFilters {
  tags?: string[]
  isPublic?: boolean
}
