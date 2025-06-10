import { FastifyReply, FastifyRequest } from "fastify";

import { BaseError } from "@shared/errors/BaseError";

import {
  CategoryRepository,
  ICategoryRepository,
} from "../repositories/CategoryRepository";

import { ListCategoriesUseCase } from "../usecases/list-categories.usecase";
import { CreateCategoryUseCase } from "../usecases/create-category.usecase";
import { GetCategoryUseCase } from "../usecases/get-category.usecase";
import { EditCategoryUseCase } from "../usecases/edit-category.usecase";
import { DeleteCategoryUseCase } from "../usecases/delete-category.usecase";

export type CreateCategoryRequest = {
  Body: Omit<ICategoryRepository, "id" | "userId" | "createdAt" | "updatedAt">;
};
export type GetCategoryRequest = { Params: { id: string } };
export type EditCategoryRequest = GetCategoryRequest & CreateCategoryRequest;
export type DeleteCategoryRequest = GetCategoryRequest;

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

  static async create(
    request: FastifyRequest<CreateCategoryRequest>,
    reply: FastifyReply
  ) {
    try {
      const repository = new CategoryRepository();
      const useCase = new CreateCategoryUseCase(repository);
      await useCase.execute(request.body, request.user.sub);

      reply.code(201).send({ message: "Categoria criada" });
    } catch (error) {
      if (error instanceof BaseError) {
        return reply.code(error.statusCode).send({ message: error.message });
      }

      console.error(error);
      reply.code(500).send({ message: "Erro interno" });
    }
  }

  static async get(
    request: FastifyRequest<GetCategoryRequest>,
    reply: FastifyReply
  ) {
    try {
      const { params, user } = request;

      const repository = new CategoryRepository();
      const useCase = new GetCategoryUseCase(repository);
      const category = await useCase.execute(params.id, user.sub);

      reply.code(200).send({ category });
    } catch (error) {
      if (error instanceof BaseError) {
        return reply.code(error.statusCode).send({ message: error.message });
      }

      console.error(error);
      reply.code(500).send({ message: "Erro interno" });
    }
  }

  static async edit(
    request: FastifyRequest<EditCategoryRequest>,
    reply: FastifyReply
  ) {
    try {
      const { params, body, user } = request;

      const repository = new CategoryRepository();
      const useCase = new EditCategoryUseCase(repository);
      const category = await useCase.execute(params.id, body, user.sub);

      reply.code(200).send({ category });
    } catch (error) {
      if (error instanceof BaseError) {
        return reply.code(error.statusCode).send({ message: error.message });
      }

      console.error(error);
      reply.code(500).send({ message: "Erro interno" });
    }
  }

  static async remove(
    request: FastifyRequest<DeleteCategoryRequest>,
    reply: FastifyReply
  ) {
    try {
      const { params, user } = request;

      const repository = new CategoryRepository();
      const useCase = new DeleteCategoryUseCase(repository);
      await useCase.execute(params.id, user.sub);

      reply.code(200).send({ message: "Categoria deletada" });
    } catch (error) {
      if (error instanceof BaseError) {
        return reply.code(error.statusCode).send({ message: error.message });
      }

      console.error(error);
      reply.code(500).send({ message: "Erro interno" });
    }
  }
}
