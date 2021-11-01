import { Body, Controller, Post, Request, UseGuards } from "@nestjs/common";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import { Author } from "../authors/author.entity";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";
import { SignUpDto } from "./dto/signup.dto";
import { LocalAuthGuard } from "./local.auth.guard";

@Controller("auth")
@ApiTags("Auth")
export class AuthController {
  constructor(
    private authService: AuthService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post("login")
  @ApiBody({ type: LoginDto })
  login(@Request() { user }: {user: Author}) {
    return this.authService.login(user);
  }

  @Post("signup")
  async signup(@Body() params: SignUpDto) {
    return this.authService.signup(params);
  }
}
