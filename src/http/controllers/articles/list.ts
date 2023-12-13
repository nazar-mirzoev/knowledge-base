import { Request, Response } from 'express'

import logger from '#/services/logger'
import ArticleActions from '#/actions/articles'
import ArticleAdapter from '../../adapters/article'

import { HTTPStatus } from '#/http/types'

export interface IListArticleRequestQuery {
  tags?: string
}

export default async (req: Request<unknown, unknown, unknown, IListArticleRequestQuery>, res: Response) => {
  try {
    const { user, query } = req

    const filter = ArticleAdapter.queryToFilter(query)

    if (!user) {
      filter.isPublic = true
    }

    const article = await ArticleActions.list(filter)

    const adapted = ArticleAdapter.toListJson(article)

    res.json(adapted)
  } catch (error) {
    logger.error(error as Error)
    return res.status(HTTPStatus.BadRequest).json({ code: HTTPStatus.BadRequest, message: 'Something went wrong' })
  }
}
