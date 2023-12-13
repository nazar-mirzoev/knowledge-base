import { Document, ObjectId, Schema } from 'mongoose'
import dbService from '#/services/db'

export interface IArticle {
  title: string
  author: ObjectId
  updatedBy?: ObjectId
  isPublic: boolean
  content?: string
  tags?: string[]
  createdAt?: Date
  updatedAt?: Date
}

export interface IArticleDocument extends IArticle, Document {}

const ArticleSchema = new Schema<IArticleDocument>(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    updatedBy: {
      type: Schema.Types.ObjectId,
    },
    content: {
      type: String,
    },
    tags: {
      type: [String],
    },
    isPublic: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
)

const Article = dbService.model<IArticleDocument>('Article', ArticleSchema)
export default Article
