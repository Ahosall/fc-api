import { FastifyReply, FastifyRequest } from "fastify";

import { BaseError } from "@shared/errors/BaseError";

import { AuthRepository } from "../repositories/AuthRepository";
import { JwtRepository } from "../repositories/JwtFastifyRepository";

import {
  LoginUserUseCase,
  ILoginUserInput,
} from "../usecases/login-user.usecase";
import {
  CreateUserUseCase,
  ICreateUserInput,
} from "../usecases/create-user.usecase";
import { MeUserUseCase } from "../usecases/me-user.usecase";

// Types
export type CreateUserRequest = { Body: ICreateUserInput };
export type LoginUserRequest = { Body: ILoginUserInput };

export class AuthController {
  static async create(
    request: FastifyRequest<CreateUserRequest>,
    reply: FastifyReply
  ) {
    try {
      const authRepository = new AuthRepository();

      const useCase = new CreateUserUseCase(authRepository);
      await useCase.execute(request.body);

      return reply.status(201).send({ message: "User created" });
    } catch (error) {
      if (error instanceof BaseError) {
        return reply.status(error.statusCode).send({ message: error.message });
      }

      console.error(error);
      reply.status(500).send({ message: "Erro interno" });
    }
  }

  static async login(
    request: FastifyRequest<LoginUserRequest>,
    reply: FastifyReply
  ) {
    try {
      const authRepository = new AuthRepository();
      const jwtRepository = new JwtRepository(request.server);

      const useCase = new LoginUserUseCase(authRepository, jwtRepository);

      const { token, user } = await useCase.execute(request.body);

      return reply.status(200).send({ token, user });
    } catch (error) {
      if (error instanceof BaseError) {
        return reply.status(error.statusCode).send({ message: error.message });
      }

      console.error(error);
      reply.status(500).send({ message: "Erro interno" });
    }
  }

  static async readMe(request: FastifyRequest, reply: FastifyReply) {
    try {
      const authRepository = new AuthRepository();
      const useCase = new MeUserUseCase(authRepository);
      const user = await useCase.execute(request.user);

      return reply.status(200).send({ user });
    } catch (error) {
      if (error instanceof BaseError) {
        return reply.status(error.statusCode).send({ message: error.message });
      }

      console.error(error);
      reply.status(500).send({ message: "Erro interno" });
    }
  }
}
