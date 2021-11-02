import { ConfigService } from "../config/config.service";

export const jwtConstants = {
  secret: ConfigService.getInstance().JWT_KEY,
};
