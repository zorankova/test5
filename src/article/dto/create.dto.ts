import { ApiProperty } from "@nestjs/swagger";
import { IsDefined } from "class-validator";

export class CreateArticleDto {
  @ApiProperty()
  @IsDefined()
    title: string;

  @ApiProperty()
  @IsDefined()
    body: string;
}
