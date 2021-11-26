import { Connection } from "typeorm"

export type ApolloContext = {
  orm: Connection
}
