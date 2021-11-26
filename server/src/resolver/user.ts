import "reflect-metadata"
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql"
import { User } from "../models/User"
import { ApolloContext } from "../types"

@Resolver()
export class UserResolver {
  @Query(() => [User])
  async getUsers(@Ctx() { orm }: ApolloContext): Promise<User[]> {
    const userRepo = orm.getRepository(User)
    return await userRepo.find()
  }

  @Mutation(() => User)
  async registerUser(
    @Arg("username", () => String) username: string,
    @Arg("password", () => String) password: string,
    @Arg("email", () => String) email: string
    @Ctx() { orm }: ApolloContext
  ): Promise<User> {
    const user = new User()
    const userRepo = orm.getRepository(User)
    user.username = username
    user.password = password
    user.email = email
    await userRepo.save(user)
    return user
  }
}
