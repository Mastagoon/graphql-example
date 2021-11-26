import { Field, Int, ObjectType } from "type-graphql"
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm"

@Entity()
@ObjectType()
export class User {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number

  @Field(() => String)
  @Column({
    length: 20,
    type: "varchar",
  })
  username!: string

  //   @Field(() => String)
  @Column("varchar")
  password!: string

  @Field(() => String)
  @Column({ length: 30, type: "varchar" })
  email!: string

  @Field(() => Date)
  @CreateDateColumn({ type: "timestamp" })
  created_at!: Date

  @Field(() => Date)
  @UpdateDateColumn({ type: "timestamp" })
  updated_at!: Date
}
