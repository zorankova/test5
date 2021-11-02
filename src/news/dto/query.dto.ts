import { ApiPropertyOptional } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsNumber, IsOptional, IsPositive } from "class-validator";

export class QueryDto {

  @ApiPropertyOptional({type: Number, default: 1})
  @IsOptional()
  @Transform(({value}) => parseInt(value, 10))
  @IsNumber()
  @IsPositive()
  page = 1;


  @ApiPropertyOptional({type: Number, default: 10})
  @IsOptional()
  @Transform(({value}) => parseInt(value, 10))
  @IsNumber()
  @IsPositive()
  limit = 10;
}
