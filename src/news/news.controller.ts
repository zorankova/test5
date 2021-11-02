import { ClassSerializerInterceptor, Controller, Get, Query, UseInterceptors } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ArticleService } from "../article/article.service";
import { CommonValidationPipe } from "../utils/commonValidationPipe";
import { NewsItemDto } from "./dto/newsItem.dto";
import { QueryDto } from "./dto/query.dto";

@Controller("news")
@UseInterceptors(ClassSerializerInterceptor)
@ApiTags("News")
export class NewsController {
  constructor(
    private articleService: ArticleService,
  ) {}

  @Get()
  async getAll(
    @Query(CommonValidationPipe) {page, limit}: QueryDto,
  ) {
    return (await this.articleService.getLatestArticles(page, limit))
      .map((article) => NewsItemDto.buildFromArticle(article));
  }
}
