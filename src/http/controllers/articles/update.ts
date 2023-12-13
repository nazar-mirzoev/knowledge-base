import { Request, Response } from 'express'

import logger from '#/services/logger'
import ArticleActions from '#/actions/articles'
import ArticleAdapter from '../../adapters/article'

import { HTTPStatus } from '#/http/types'

interface IUpdateArticleBody {
  title: string
  content?: string
  tags?: string[]
  isPublic?: boolean
}

export default async (req: Request<{ id: string }, unknown, IUpdateArticleBody>, res: Response) => {
  try {
    const {
      user,
      body,
      params: { id },
    } = req
    const article = await ArticleActions.update(user, id, body)

    const adapted = ArticleAdapter.toJson(article)

    res.json(adapted)
  } catch (error) {
    logger.error(error as Error)
    return res.status(HTTPStatus.BadRequest).json({ code: HTTPStatus.BadRequest, message: 'Something went wrong' })
  }
}
