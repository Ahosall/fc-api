import { FastifyInstance } from "fastify";

import {
  CategoryController,
  CreateCategoryRequest,
  EditCategoryRequest,
  GetCategoryRequest,
} from "./controllers/CategoryController";

export const categoriesRoutes = (instance: FastifyInstance) => {
  const preConf = { preHandler: [instance.authenticate] };

  const { list, create, get, edit } = CategoryController;

  // GET:/categories/list
  instance.get("/list", preConf, list);

  // POST:/categories/create
  instance.post<CreateCategoryRequest>("/create", preConf, create);

  // GET:/categories/:id
  instance.get<GetCategoryRequest>("/:id", preConf, get);

  // PUT:/categories/:id/edit
  instance.put<EditCategoryRequest>("/:id/edit", preConf, edit);

  // DELETE:/categories/:id/delete
};
