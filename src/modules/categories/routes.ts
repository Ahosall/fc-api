import { FastifyInstance } from "fastify";

import {
  CategoryController,
  CreateCategoryRequest,
} from "./controllers/CategoryController";

export const categoriesRoutes = (instance: FastifyInstance) => {
  const preConf = { preHandler: [instance.authenticate] };

  const { list, create } = CategoryController;

  // GET:/categories/list
  instance.get("/list", preConf, list);

  // POST:/categories/create
  instance.post<CreateCategoryRequest>("/create", preConf, create);

  // GET:/categories/:id

  // PUT:/categories/:id/edit

  // DELETE:/categories/:id/delete
};
