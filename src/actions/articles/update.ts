import { articleRepository } from '#/models/repositories'

import { IArticleDocument } from '#/models/entities/article'
import { IUpdateArticlePayload } from './types'
import { ICurrentUser } from '#/http/types'

const updateArticleAction = async (
  user: ICurrentUser,
  id: string,
  payload: IUpdateArticlePayload,
): Promise<IArticleDocument> => {
  if (!Object.keys(payload).length) {
    throw new Error('No data to update')
  }

  const updatedArticle = await articleRepository.update(user._id, id, payload)

  return updatedArticle
}

export default updateArticleAction
