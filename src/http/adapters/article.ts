import { IListArticleFilters } from '#/actions/articles/types'
import { IArticleDocument } from '#/models/entities/article'
import { IListArticleRequestQuery } from '../controllers/articles/list'
import { IArticleDTO } from '../dto/article'

class ArticleAdapter {
  public static toJson(article: IArticleDocument): IArticleDTO {
    return {
      _id: article._id.toString(),
      title: article.title,
      author: article.author.toString(),
      updatedBy: article.updatedBy?.toString(),
      content: article.content,
      tags: article.tags,
      isPublic: article.isPublic,
    }
  }

  public static toListJson(articles: IArticleDocument[]): IArticleDTO[] {
    return articles.map((article) => this.toJson(article))
  }

  public static queryToFilter(query: IListArticleRequestQuery): IListArticleFilters {
    const filters: IListArticleFilters = {}

    if (query.tags) {
      filters.tags = query.tags.split(',').map((tag) => tag.trim())
    }

    return filters
  }
}

export default ArticleAdapter
