import { FastifyReply, FastifyRequest } from "fastify";

import { BaseError } from "@shared/errors/BaseError";

import {
  IMethodRepository,
  MethodRepository,
} from "../repositories/MethodRepository";

import { CreateMethodUseCase } from "../usecases/create-method.usecase";
import { ListMethodsUseCase } from "../usecases/list-methods.usecase";
import { GetMethodUseCase } from "../usecases/get-method.usecase";
import { EditMethodUseCase } from "../usecases/edit-method.usecase";
import { DeleteMethodUseCase } from "../usecases/delete-method.usecase";

export type CreateMethodRequest = {
  Body: Omit<IMethodRepository, "id" | "userId" | "createdAt">;
};
export type GetMethodRequest = { Params: { id: string } };
export type EditMethodRequest = GetMethodRequest & CreateMethodRequest;
export type DeleteMethodRequest = GetMethodRequest;

export class MethodController {
  // Aplicar filtros de busca futuramente
  static async list(request: FastifyRequest, reply: FastifyReply) {
    try {
      const repository = new MethodRepository();
      const useCase = new ListMethodsUseCase(repository);
      const methods = await useCase.execute(request.user.sub);
      reply.status(200).send({ methods });
    } catch (error) {
      if (error instanceof BaseError) {
        return reply.code(error.statusCode).send({ message: error.message });
      }

      console.error(error);
      reply.code(500).send({ message: "Erro interno" });
    }
  }

  static async create(
    request: FastifyRequest<CreateMethodRequest>,
    reply: FastifyReply
  ) {
    try {
      const { body, user } = request;

      const repository = new MethodRepository();
      const useCase = new CreateMethodUseCase(repository);
      await useCase.execute(body, user.sub);

      reply.status(201).send({ message: "Forma de pagamento criada" });
    } catch (error) {
      if (error instanceof BaseError) {
        return reply.code(error.statusCode).send({ message: error.message });
      }

      console.error(error);
      reply.code(500).send({ message: "Erro interno" });
    }
  }

  static async get(
    request: FastifyRequest<GetMethodRequest>,
    reply: FastifyReply
  ) {
    try {
      const { params, user } = request;

      const repository = new MethodRepository();
      const useCase = new GetMethodUseCase(repository);
      const method = await useCase.execute(params.id, user.sub);

      reply.code(200).send({ method });
    } catch (error) {
      if (error instanceof BaseError) {
        return reply.code(error.statusCode).send({ message: error.message });
      }

      console.error(error);
      reply.code(500).send({ message: "Erro interno" });
    }
  }

  static async edit(
    request: FastifyRequest<EditMethodRequest>,
    reply: FastifyReply
  ) {
    try {
      const { params, body, user } = request;

      const repository = new MethodRepository();
      const useCase = new EditMethodUseCase(repository);
      const method = await useCase.execute(params.id, body, user.sub);

      reply.code(200).send({ method });
    } catch (error) {
      if (error instanceof BaseError) {
        return reply.code(error.statusCode).send({ message: error.message });
      }

      console.error(error);
      reply.code(500).send({ message: "Erro interno" });
    }
  }

  static async remove(
    request: FastifyRequest<DeleteMethodRequest>,
    reply: FastifyReply
  ) {
    try {
      const { params, user } = request;

      const repository = new MethodRepository();
      const useCase = new DeleteMethodUseCase(repository);
      await useCase.execute(params.id, user.sub);

      reply.code(200).send({ message: "Forma de pagamento deletada" });
    } catch (error) {
      if (error instanceof BaseError) {
        return reply.code(error.statusCode).send({ message: error.message });
      }

      console.error(error);
      reply.code(500).send({ message: "Erro interno" });
    }
  }
}
