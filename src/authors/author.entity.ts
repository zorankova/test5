import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Article } from "../article/article.entity";

@Entity()
export class Author {
  
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({nullable: false})
  name: string;

  @OneToMany(() => Article, (article) => article.author)
  articles: Article[]
}
