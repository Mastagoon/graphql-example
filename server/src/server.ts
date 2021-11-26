import express, { Request, Response } from "express"
import { ApolloServer } from "apollo-server-express"
import { buildSchema } from "type-graphql"
import { HelloResolver } from "./resolver/hello"
import { createConnection } from "typeorm"
import { User } from "./models/User"
import { UserResolver } from "./resolver/user"

const main = async () => {
  const app = express()
  // database stuff
  const orm = await createConnection({
    type: "mysql",
    host: "localhost",
    username: "graphql_user",
    password: "123456",
    database: "graphql_db",
    entities: [User],
    // synchronize: true,
    // synchronize: process.argv.includes("--sync"),
    logging: true,
  })
  // apollo stuff
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, UserResolver],
    }),
    context: () => ({ orm}),
  })

  await apolloServer.start()

  apolloServer.applyMiddleware({ app })

  app.get("/", (req: Request, res: Response) => res.json("hello"))

  app.listen(9000, () =>
    console.log("Listening on port 9000" + apolloServer.graphqlPath)
  )
}

main()
