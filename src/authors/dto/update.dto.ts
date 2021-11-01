import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional } from "class-validator";
export class UpdateAuthorDto {

  @ApiPropertyOptional()
  @IsOptional()
    name?: string;
}
