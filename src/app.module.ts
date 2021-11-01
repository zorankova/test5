import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ArticleModule } from "./article/article.module";
import { AuthModule } from "./auth/auth.module";
import { AuthorsModule } from "./authors/authors.module";
import { NewsModule } from "./news/news.module";
import { TypeORMModule } from "./typeorm/typeorm.module";

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeORMModule,
    AuthModule,
    AuthorsModule,
    ArticleModule,
    NewsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
