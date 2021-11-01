import { Module } from "@nestjs/common";
import { ConfigModule as NestJSConfig, ConfigService } from "@nestjs/config";

@Module({
  imports: [NestJSConfig.forRoot()],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigModule {}
