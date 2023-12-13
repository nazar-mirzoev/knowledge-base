import { articleRepository } from '#/models/repositories'

import { IArticleDocument } from '#/models/entities/article'

const removeArticleAction = async (id: string): Promise<IArticleDocument> => {
  const article = await articleRepository.deleteById(id)

  return article
}

export default removeArticleAction
