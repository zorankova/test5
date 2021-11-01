import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Author } from "../authors/author.entity";

@Entity()
export class Article {
  constructor(props: Partial<Author>) {
    Object.assign(this, props);
  }

  @PrimaryGeneratedColumn("uuid")
    id: string;

  @Column({ nullable: false })
    title: string;

  @Column({ nullable: false })
    body: string;

  @ManyToOne(() => Author, (author) => author.articles, { nullable: false })
    author: Author;

  @Column()
    authorId: string;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    createdAt: Date;
    
  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    updatedAt: Date;
}
