import { ForbiddenException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Author } from "../authors/author.entity";
import { Article } from "./article.entity";

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private readonly articlesRepository: Repository<Article>,
  ) {}

  async findOneById(id: string): Promise<Article> {
    return this.articlesRepository.findOne(id);
  }

  async findAll(): Promise<Article[]> {
    return this.articlesRepository.find({
      join: {
        alias: "article",
        innerJoinAndSelect: {
          author: "article.author",
        },
      },
    });
  }

  async getLatestArticles(page: number, limit: number): Promise<Article[]> {
    return this.articlesRepository.find({
      join: {
        alias: "article",
        innerJoinAndSelect: {
          author: "article.author",
        },
      },
      order: {
        updatedAt: "DESC",
      },
      take: limit,
      skip: (page - 1) * limit,
    });
  }

  async create(props: Partial<Article>, authorId: string) {
    await this.articlesRepository.save(new Article({
      author: new Author({ id: authorId }),
      ...props,
    }));
  }

  async update(id: string, props: Partial<Article>, author: Author) {
    const article = await this.articlesRepository.findOne({
      where: {
        id,
      },
      select: ["authorId"],
    });
    if (article.authorId !== author.id) {
      throw new ForbiddenException();
    }
    return this.articlesRepository.save(new Article({
      id,
      ...props,
    }));
  }
}
