import { Request, Response } from 'express'

import logger from '#/services/logger'
import ArticleActions from '#/actions/articles'
import ArticleAdapter from '../../adapters/article'

import { HTTPStatus } from '#/http/types'

export default async (req: Request<{ id: string }>, res: Response) => {
  try {
    const {
      params: { id },
    } = req
    const article = await ArticleActions.remove(id)

    const adapted = ArticleAdapter.toJson(article)

    res.json(adapted)
  } catch (error) {
    logger.error(error as Error)
    return res.status(HTTPStatus.BadRequest).json({ code: HTTPStatus.BadRequest, message: 'Something went wrong' })
  }
}
