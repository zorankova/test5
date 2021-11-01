import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Article } from "../article/article.entity";


@Entity()
export class Author {
  constructor(props: Partial<Author>) {
    Object.assign(this, props);
  }

  /* 
    linter somehow prefers to have 2 spaces before prop name :/
  */
  @PrimaryGeneratedColumn("uuid")
    id: string; 

  @Column({ nullable: false })
    username: string;

  @Column({ nullable: false, select: false })
    passwordHash: string;

  @Column({ nullable: false })
    name: string;

  @OneToMany(() => Article, (article) => article.author)
    articles: Article[];
}
