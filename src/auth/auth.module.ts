import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { AuthorsModule } from "../authors/authors.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { jwtConstants } from "./constants";
import { JwtStrategy } from "./jwt.strategy";
import { LocalStrategy } from "./local.strategy";

@Module({
  imports: [
    AuthorsModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: "60m" },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
