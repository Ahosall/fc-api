import { FastifyInstance } from "fastify";

import { TransactionController } from "./controllers/TransactionController";

export const transactionsRoutes = (instance: FastifyInstance) => {
  const preConf = { preHandler: [instance.authenticate] };

  const { list } = TransactionController;

  // GET:/transactions/list
  instance.get("/list", preConf, list);

  // POST:/transactions/create

  // GET:/transactions/:id

  // PUT:/transactions/:id/edit

  // DELETE:/transactions/:id/delete
};
