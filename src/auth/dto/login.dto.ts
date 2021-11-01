import { ApiProperty } from "@nestjs/swagger";
import { IsDefined, IsString, MinLength } from "class-validator";

export class LoginDto {
  @ApiProperty()
  @IsDefined()
  @IsString()
  @MinLength(5)
    username: string;

  @ApiProperty()
  @IsDefined()
  @IsString()
  @MinLength(5)
    password: string;
}
