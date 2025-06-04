import { FastifyInstance } from "fastify";
import {
  AuthController,
  CreateUserRequest,
  LoginUserRequest,
} from "./controllers/AuthController";

export const authRoutes = (instance: FastifyInstance) => {
  const preConf = { preHandler: [instance.authenticate] };
  // POST:/auth/register
  instance.post<CreateUserRequest>("/register", AuthController.create);

  // POST:/auth/login
  instance.post<LoginUserRequest>("/login", AuthController.login);

  // POST:/auth/me
  instance.get("/me", preConf, AuthController.readMe);
};
