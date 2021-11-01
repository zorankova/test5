import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { join } from "path/posix";
import { ConfigModule } from "../config/config.module";

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRootAsync({
      imports: [
        ConfigModule,
      ],
      useFactory: (configService: ConfigService) => ({
        type: "postgres",
        host: configService.get("TYPEORM_HOST"),
        port: parseInt(configService.get("TYPEORM_PORT"), 10),
        username: configService.get("TYPEORM_USERNAME"),
        password: configService.get("TYPEORM_PASSWORD"),
        database: configService.get("TYPEORM_DATABASE"),
        entities: [join(__dirname, "**", configService.get("TYPEORM_ENTITIES")) ],
        synchronize: configService.get("TYPEORM_SYNCHRONIZE") === "true",
        dropSchema: configService.get("TYPEORM_DROP_SCHEMA") === "true",
        keepConnectionAlive: false,
        autoLoadEntities: true,
      }),
      inject: [
        ConfigService,
      ],
    }),
  ],
})
export class TypeORMModule {}
