export interface IArticleDTO {
  _id: string
  title: string
  author: string
  isPublic: boolean
  updatedBy?: string
  content?: string
  tags?: string[]
}
