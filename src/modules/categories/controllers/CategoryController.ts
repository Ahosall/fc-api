import { FastifyReply, FastifyRequest } from "fastify";

import { BaseError } from "@shared/errors/BaseError";

import { CategoryRepository } from "../repositories/CategoryRepository";
import { ListCategoriesUseCase } from "../usecases/list-categories.usecase";

export class CategoryController {
  // * Futuramente aplicar filtros para melhorar a busca
  static async list(request: FastifyRequest, reply: FastifyReply) {
    try {
      const repository = new CategoryRepository();
      const useCase = new ListCategoriesUseCase(repository);
      const categories = await useCase.execute(request.user.sub);

      reply.code(200).send({ categories });
    } catch (error) {
      if (error instanceof BaseError) {
        return reply.code(error.statusCode).send({ message: error.message });
      }

      console.error(error);
      reply.code(500).send({ message: "Erro interno" });
    }
  }
}
