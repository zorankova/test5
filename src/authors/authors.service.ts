import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Author } from "./author.entity";
import { UpdateAuthorDto } from "./dto/update.dto";

export type User = any;

@Injectable()
export class AuthorsService {
  constructor(
    @InjectRepository(Author)
    private readonly authorsRepository: Repository<Author>,
  ) {}

  async findOneForValidation(
    username: string
  ): Promise<Pick<Author, "username" | "passwordHash" | "id">> {
    return this.authorsRepository.findOne({
      where: {
        username,
      },
      select: ["username", "passwordHash", "id"],
    });
  }

  async findOneById(id: string): Promise<Author> {
    return this.authorsRepository.findOne(id);
  }

  async findAll(): Promise<Author[]> {
    return this.authorsRepository.find();
  }

  async create(username, passwordHash, name) {
    await this.authorsRepository.save(new Author({
      username,
      passwordHash,
      name,
    }));
  }

  async update(id: string, props: UpdateAuthorDto) {
    return this.authorsRepository.save(new Author({
      id,
      ...props,
    }));
  }
}
