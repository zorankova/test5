import { Body, Controller, Get, Param, ParseUUIDPipe, Patch, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "../auth/jwt.auth.guard";
import { CommonValidationPipe } from "../utils/commonValidationPipe";
import { AuthorsService } from "./authors.service";
import { UpdateAuthorDto } from "./dto/update.dto";

@Controller("authors")
@ApiBearerAuth()
@ApiTags("Authors")
@UseGuards(JwtAuthGuard)
export class AuthorsController {
  constructor(
    private authorService: AuthorsService,
  ) {}

  @Get()
  getAll() {
    return this.authorService.findAll();
  }

  @Get("/:id")
  getOne(@Param("id", ParseUUIDPipe) id: string) {

    return this.authorService.findOneById(id);
  }

  @Patch("/:id")
  async updateOne(
  @Param("id", ParseUUIDPipe) id: string,
    @Body(CommonValidationPipe) props: UpdateAuthorDto,
  ) {
    const created = await this.authorService.update(id, props);

    return this.authorService.findOneById(created.id);
  }
}
