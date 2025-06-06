import { FastifyInstance } from "fastify";

import {
  CategoryController,
  CreateCategoryRequest,
  GetCategoryRequest,
} from "./controllers/CategoryController";

export const categoriesRoutes = (instance: FastifyInstance) => {
  const preConf = { preHandler: [instance.authenticate] };

  const { list, create, get } = CategoryController;

  // GET:/categories/list
  instance.get("/list", preConf, list);

  // POST:/categories/create
  instance.post<CreateCategoryRequest>("/create", preConf, create);

  // GET:/categories/:id
  instance.get<GetCategoryRequest>("/:id", preConf, get);
  
  // PUT:/categories/:id/edit
  instance.put<GetCategoryRequest>("/:id/edit", preConf, get);

  // DELETE:/categories/:id/delete
};
