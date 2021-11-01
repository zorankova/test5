import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { AuthorsService } from "../authors/authors.service";
import { jwtConstants } from "./constants";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authorsService: AuthorsService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: any) {
    const author = await this.authorsService.findOneById(payload.sub);
    if(!author) {
      return null;
    }
    return author;
  }
}
