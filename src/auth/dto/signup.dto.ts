import { ApiProperty } from "@nestjs/swagger";
import { IsDefined, IsString, MinLength } from "class-validator";

export class SignUpDto {
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

  @ApiProperty()
  @IsDefined()
  @IsString()
  @MinLength(5)
    passwordConfirmation: string;

  @ApiProperty()
  @IsDefined()
  @IsString()
  @MinLength(5)
    name: string;
}
