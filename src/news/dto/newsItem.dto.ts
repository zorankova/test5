import { Article } from "../../article/article.entity";

export class NewsItemDto {
  static buildFromArticle(article: Article) {
    const item = new NewsItemDto();
    item.title = article.title;
    item.body = article.body;
    item.authorId = article.author.id;
    item.authorName = article.author.name;

    return item;
  }

  title: string;
  body: string;
  authorName: string;
  authorId: string;
}
