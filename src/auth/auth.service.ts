import { BadRequestException, ConflictException, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { Author } from "../authors/author.entity";
import { AuthorsService } from "../authors/authors.service";
import { SignUpDto } from "./dto/signup.dto";

@Injectable()
export class AuthService {
  constructor(
    private authorsService: AuthorsService,
    private jwtService: JwtService
  ) {}

  async validateAuthor(username: string, pass: string): Promise<any> {
    const author = await this.authorsService.findOneForValidation(username);

    const result = await bcrypt.compare(pass, author.passwordHash);

    if (result) {
      return this.authorsService.findOneById(author.id);
    }
    return null;
  }

  login(author: Author) {
    const payload = { username: author.username, sub: author.id };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  async signup(params: SignUpDto) {
    const { password, passwordConfirmation, username, name } = params;
    const author = await this.authorsService.findOneForValidation(username);

    if (author) {
      throw new ConflictException();
    }

    if (password !== passwordConfirmation) {
      throw new BadRequestException();
    }

    const passwordHash = await bcrypt.hash(password, 10);

    await this.authorsService.create(username, passwordHash, name);
  }
}
