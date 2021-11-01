import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Author } from "./author.entity";
import { AuthorsController } from "./authors.controller";
import { AuthorsService } from "./authors.service";

@Module({
  imports: [TypeOrmModule.forFeature([Author])],
  providers: [AuthorsService],
  controllers: [AuthorsController],
  exports: [AuthorsService],
})
export class AuthorsModule {}
