"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserResolver = void 0;
require("reflect-metadata");
const type_graphql_1 = require("type-graphql");
const User_1 = require("../models/User");
let UserResolver = class UserResolver {
    getUsers({ orm }) {
        return __awaiter(this, void 0, void 0, function* () {
            const userRepo = orm.getRepository(User_1.User);
            return yield userRepo.find();
        });
    }
    registerUser(username, password, email, { orm }) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = new User_1.User();
            const userRepo = orm.getRepository(User_1.User);
            user.username = username;
            user.password = password;
            user.email = email;
            yield userRepo.save(user);
            return user;
        });
    }
};
__decorate([
    (0, type_graphql_1.Query)(() => [User_1.User]),
    __param(0, (0, type_graphql_1.Ctx)())
], UserResolver.prototype, "getUsers", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => User_1.User),
    __param(0, (0, type_graphql_1.Arg)("username", () => String)),
    __param(1, (0, type_graphql_1.Arg)("password", () => String)),
    __param(2, (0, type_graphql_1.Arg)("email", () => String)),
    __param(3, (0, type_graphql_1.Ctx)())
], UserResolver.prototype, "registerUser", null);
UserResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], UserResolver);
exports.UserResolver = UserResolver;
