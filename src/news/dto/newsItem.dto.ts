import { Expose } from "class-transformer";
import { Article } from "../../article/article.entity";

@Expose()
export class NewsItemDto {
  constructor(props: Article) {
    this.title = props.title;
    this.body = props.body;
    this.authorId = props.author.id;
    this.authorName = props.author.name;
  }

  title: string;
  body: string;
  authorName: string;
  authorId: string;
}
