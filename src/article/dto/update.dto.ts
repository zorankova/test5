import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional } from "class-validator";


export class UpdateArticleDto {
  @ApiPropertyOptional()
  @IsOptional()
    title?: string;

  @ApiPropertyOptional()
  @IsOptional()
    body?: string;
}
