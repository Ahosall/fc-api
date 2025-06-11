import { FastifyInstance } from "fastify";

import {
  CreateTransactionRequest,
  TransactionController,
} from "./controllers/TransactionController";

export const transactionsRoutes = (instance: FastifyInstance) => {
  const preConf = { preHandler: [instance.authenticate] };

  const { list, create } = TransactionController;

  // GET:/transactions/list
  instance.get("/list", preConf, list);

  // POST:/transactions/create
  instance.post<CreateTransactionRequest>("/create", preConf, create);

  // GET:/transactions/:id

  // PUT:/transactions/:id/edit

  // DELETE:/transactions/:id/delete
};
