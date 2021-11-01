import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from "path/posix";
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArticleController } from './article/article.controller';
import { ArticleModule } from './article/article.module';
import { ArticleService } from './article/article.service';
import { AuthModule } from './auth/auth.module';
import { AuthorsModule } from './authors/authors.module';

@Module({
  imports: [
    ConfigModule.forRoot(), TypeOrmModule.forRootAsync({
    imports: [
      ConfigModule
    ],
    useFactory: (configService: ConfigService) => { 
      const options = {
        type: "postgres",
        host: configService.get("TYPEORM_HOST") ,
        port: parseInt(configService.get("TYPEORM_PORT")) ,
        username: configService.get("TYPEORM_USERNAME") ,
        password: configService.get("TYPEORM_PASSWORD") ,
        database: configService.get("TYPEORM_DATABASE"),
        entities: [join(__dirname, '**', configService.get("TYPEORM_ENTITIES"))  ],
        synchronize: configService.get("TYPEORM_SYNCHRONIZE") === "true" ,
        dropSchema: configService.get("TYPEORM_DROP_SCHEMA")  === "true",
        keepConnectionAlive: false,
        autoLoadEntities: true,
      };
      console.log(options)
        return options as unknown as TypeOrmModuleOptions;
    },
    inject: [
        ConfigService
    ]
  }), AuthModule, AuthorsModule, ArticleModule],
  controllers: [AppController, ArticleController],
  providers: [AppService, ArticleService],
})
export class AppModule {}
