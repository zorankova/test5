import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Author } from "../authors/author.entity";

@Entity()
export class Article {
  
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({nullable: false})
  title: string;

  @Column({nullable: false})
  body: string;

  @ManyToOne(() => Author, (author) => author.articles, {nullable: false} )
  author: Author;
}
