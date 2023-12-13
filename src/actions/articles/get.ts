import { articleRepository } from '#/models/repositories'

import { IArticleDocument } from '#/models/entities/article'

const getArticleAction = async (id: string): Promise<IArticleDocument> => {
  const article = await articleRepository.getById(id)

  return article
}

export default getArticleAction
