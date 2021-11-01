import { Body, Controller, Get, Param, ParseUUIDPipe, Patch, Post, Request, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "../auth/jwt.auth.guard";
import { Author } from "../authors/author.entity";
import { CommonValidationPipe } from "../utils/updateValidationPipe";
import { ArticleService } from "./article.service";
import { CreateArticleDto } from "./dto/create.dto";
import { UpdateArticleDto } from "./dto/update.dto";

@Controller("articles")
@ApiBearerAuth()
@ApiTags("Articles")
@UseGuards(JwtAuthGuard)
export class ArticleController {
  constructor(
    private articleService: ArticleService,
  ) {}

  @Get()
  getAll() {
    return this.articleService.findAll();
  }

  @Get("/:id")
  getOne(@Param("id", ParseUUIDPipe) id: string) {
    return this.articleService.findOneById(id);
  }

  @Post()
  async createOne(@Body(CommonValidationPipe) props: CreateArticleDto, @Request() { user }: {user: Author}) {
    await this.articleService.create(props, user.id);
  }

  @Patch("/:id")
  async updateOne(
  @Param("id", ParseUUIDPipe) id: string,
    @Body(CommonValidationPipe) props: UpdateArticleDto,
    @Request() { user }: {user: Author}
  ) {
    const created = await this.articleService.update(id, props, user);

    return this.articleService.findOneById(created.id);
  }
}
