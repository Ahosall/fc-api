import { FastifyReply, FastifyRequest } from "fastify";

import { BaseError } from "@shared/errors/BaseError";

import {
  ITransactionRepository,
  TransactionRepository,
} from "../repositories/TransactionRepository";

import { ListTransactionsUseCase } from "../usecase/list-transactions.usecase";
import { CreateTransactionUseCase } from "../usecase/create-transaction.usecase";

export type CreateTransactionRequest = {
  Body: Omit<ITransactionRepository, "id" | "userId" | "createdAt">;
};

export class TransactionController {
  static async list(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { user } = request;

      const repository = new TransactionRepository();
      const useCase = new ListTransactionsUseCase(repository);
      const transactions = await useCase.execute(user.sub);

      reply.code(200).send({ transactions });
    } catch (error) {
      if (error instanceof BaseError) {
        return reply.code(error.statusCode).send({ message: error.message });
      }

      console.error(error);
      reply.code(500).send({ message: "Erro interno" });
    }
  }

  static async create(
    request: FastifyRequest<CreateTransactionRequest>,
    reply: FastifyReply
  ) {
    try {
      const { body, user } = request;

      const repository = new TransactionRepository();
      const useCase = new CreateTransactionUseCase(repository);
      await useCase.execute(body, user.sub);

      reply.code(201).send({ message: "Transação criada" });
    } catch (error) {
      if (error instanceof BaseError) {
        return reply.code(error.statusCode).send({ message: error.message });
      }

      console.error(error);
      reply.code(500).send({ message: "Erro interno" });
    }
  }
}
