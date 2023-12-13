import { articleRepository } from '#/models/repositories'

import { IArticleDocument } from '#/models/entities/article'
import { IListArticleFilters } from './types'

const listArticleAction = async (filter: IListArticleFilters): Promise<IArticleDocument[]> => {
  const article = await articleRepository.list(filter)

  return article
}

export default listArticleAction
