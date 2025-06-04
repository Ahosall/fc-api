import { FastifyInstance } from "fastify";
import { CategoryController } from "./controllers/CategoryController";

export const categoriesRoutes = (instance: FastifyInstance) => {
  const preConf = { preHandler: [instance.authenticate] };

  // GET:/categories/list
  instance.get("/list", preConf, CategoryController.list);

  // POST:/categories/create

  // GET:/categories/:id

  // PUT:/categories/:id/edit

  // DELETE:/categories/:id/delete
};
