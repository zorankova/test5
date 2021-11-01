import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from "../auth/jwt.auth.guard";
import { CreateOneDto } from "./dto/createOne.dto";
import { UpdateOneDto } from "./dto/updateOne.dto";

@Controller('authors')
@UseGuards(JwtAuthGuard)
export class AuthorsController {

  @Get()
  getAll() {
    return [];
  }

  @Get("/:id")
  getOne(@Param('id') id: string) {
    return [{exampleFor: id}];
  }

  @Patch("/:id")
  updateOne(@Body() UpdateOne: UpdateOneDto) {
    return {UpdateOne};
  }

  @Post()
  createOne(@Body() createOne: CreateOneDto) {
    return {createOne};
  }
}
