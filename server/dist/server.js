"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const apollo_server_express_1 = require("apollo-server-express");
const type_graphql_1 = require("type-graphql");
const hello_1 = require("./resolver/hello");
const typeorm_1 = require("typeorm");
const User_1 = require("./models/User");
const user_1 = require("./resolver/user");
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    const app = (0, express_1.default)();
    // database stuff
    const orm = yield (0, typeorm_1.createConnection)({
        type: "mysql",
        host: "localhost",
        username: "graphql_user",
        password: "123456",
        database: "graphql_db",
        entities: [User_1.User],
        // synchronize: true,
        // synchronize: process.argv.includes("--sync"),
        logging: true,
    });
    // apollo stuff
    const apolloServer = new apollo_server_express_1.ApolloServer({
        schema: yield (0, type_graphql_1.buildSchema)({
            resolvers: [hello_1.HelloResolver, user_1.UserResolver],
        }),
        context: () => ({ orm }),
    });
    yield apolloServer.start();
    apolloServer.applyMiddleware({ app });
    app.get("/", (req, res) => res.json("hello"));
    app.listen(9000, () => console.log("Listening on port 9000" + apolloServer.graphqlPath));
});
main();
