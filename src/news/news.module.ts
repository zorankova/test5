import { Module } from "@nestjs/common";
import { ArticleModule } from "../article/article.module";
import { NewsController } from "./news.controller";

@Module({
  imports: [ArticleModule],
  controllers: [NewsController],
})
export class NewsModule {}
