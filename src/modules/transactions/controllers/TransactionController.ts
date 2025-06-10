import { FastifyReply, FastifyRequest } from "fastify";

import { BaseError } from "@shared/errors/BaseError";
import { TransactionRepository } from "../repositories/TransactionRepository";
import { ListTransactionsUseCase } from "../usecase/list-transactions.usecase";

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
}
