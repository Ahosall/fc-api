import { FastifyInstance } from "fastify";

import {
  MethodController,
  CreateMethodRequest,
  GetMethodRequest,
} from "./controllers/MethodController";

export const methodsRoutes = (instance: FastifyInstance) => {
  const preConf = { preHandler: [instance.authenticate] };

  const { list, create, get } = MethodController;

  // GET:/methods/list
  instance.get("/list", preConf, list);

  // POST:/methods/create
  instance.post<CreateMethodRequest>("/create", preConf, create);

  // GET:/methods/:id
  instance.get<GetMethodRequest>("/:id", preConf, get);

  // PUT:/methods/:id/edit

  // DELETE:/methods/:id/delete
};
