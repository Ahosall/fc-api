import { FastifyInstance } from "fastify";

import { MethodController } from "./controllers/MethodController";

export const methodsRoutes = (instance: FastifyInstance) => {
  const preConf = { preHandler: [instance.authenticate] };

  const { list } = MethodController;

  // GET:/methods/list
  instance.get("/list", preConf, list);

  // POST:/methods/create

  // GET:/methods/:id

  // PUT:/methods/:id/edit

  // DELETE:/methods/:id/delete
};
