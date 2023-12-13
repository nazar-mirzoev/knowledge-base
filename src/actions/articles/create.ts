import { articleRepository } from '#/models/repositories'

import { IArticleDocument } from '#/models/entities/article'
import { ICreateArticlePayload } from './types'
import { ICurrentUser } from '#/http/types'

const createArticleAction = async (user: ICurrentUser, payload: ICreateArticlePayload): Promise<IArticleDocument> => {
  const article = await articleRepository.create(user._id, payload)

  return article
}

export default createArticleAction
