import { FastifyInstance } from "fastify";

import {
  MethodController,
  CreateMethodRequest,
} from "./controllers/MethodController";

export const methodsRoutes = (instance: FastifyInstance) => {
  const preConf = { preHandler: [instance.authenticate] };

  const { list, create } = MethodController;

  // GET:/methods/list
  instance.get("/list", preConf, list);

  // POST:/methods/create
  instance.post<CreateMethodRequest>("/create", preConf, create);

  // GET:/methods/:id

  // PUT:/methods/:id/edit

  // DELETE:/methods/:id/delete
};
