import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { join } from "path/posix";
import { ConfigModule } from "../config/config.module";
import { ConfigService } from "../config/config.service";

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRootAsync({
      imports: [
        ConfigModule,
      ],
      useFactory: (configService: ConfigService) => ({
        type: "postgres",
        host: configService.TYPEORM_HOST,
        port: configService.TYPEORM_PORT,
        username: configService.TYPEORM_USERNAME,
        password: configService.TYPEORM_PASSWORD,
        database: configService.TYPEORM_DATABASE,
        entities: [join(__dirname, "**", configService.TYPEORM_ENTITIES) ],
        synchronize: configService.TYPEORM_SYNCHRONIZE,
        dropSchema: configService.TYPEORM_DROP_SCHEMA,
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
