import { ICreateArticlePayload, IListArticleFilters, IUpdateArticlePayload } from '#/actions/articles/types'
import { FilterQuery, ObjectId } from 'mongoose'
import Article, { IArticleDocument } from '../entities/article'
import AbstractRepository from './abstract'

class ArticleRepository extends AbstractRepository<IArticleDocument> {
  constructor() {
    super(Article)
  }

  public async create(userId: ObjectId, payload: ICreateArticlePayload): Promise<IArticleDocument> {
    const article = new Article()
    article.author = userId
    article.title = payload.title

    if (payload.content) {
      article.content = payload.content
    }
    if (payload.tags) {
      article.tags = payload.tags
    }
    if (payload.isPublic !== undefined) {
      article.isPublic = payload.isPublic
    }

    return article.save()
  }

  public async update(userId: ObjectId, id: string, payload: IUpdateArticlePayload): Promise<IArticleDocument> {
    const article = await this.getById(id)
    article.updatedBy = userId

    if (payload.title) {
      article.title = payload.title
    }
    if (payload.content) {
      article.content = payload.content
    }
    if (payload.tags) {
      article.tags = payload.tags
    }
    if (payload.isPublic !== undefined) {
      article.isPublic = payload.isPublic
    }

    return article.save()
  }

  public async list(filter: IListArticleFilters): Promise<IArticleDocument[]> {
    const query: FilterQuery<IArticleDocument> = {}

    if (filter.tags?.length) {
      query.tags = { $in: filter.tags }
    }
    if (filter.isPublic !== undefined) {
      query.isPublic = filter.isPublic
    }

    return Article.find(query)
  }
}

export default ArticleRepository
