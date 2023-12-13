import { Request, Response } from 'express'

import logger from '#/services/logger'
import ArticleActions from '#/actions/articles'
import ArticleAdapter from '../../adapters/article'

import { HTTPStatus } from '#/http/types'
import { IArticleDTO } from '#/http/dto/article'

export default async (req: Request<{ id: string }>, res: Response) => {
  try {
    let publicOnly = false

    const {
      user,
      params: { id },
    } = req

    if (!user) publicOnly = true

    const article = await ArticleActions.get(id)

    let result: IArticleDTO | null

    if (publicOnly && !article.isPublic) {
      result = null
    } else {
      result = ArticleAdapter.toJson(article)
    }

    res.json(result)
  } catch (error) {
    logger.error(error as Error)
    return res.status(HTTPStatus.BadRequest).json({ code: HTTPStatus.BadRequest, message: 'Something went wrong' })
  }
}
