import fp from "fastify-plugin";

import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

const authenticatePlugin = fp(
  async (instance: FastifyInstance) => {
    instance.decorate(
      "authenticate",
      async (req: FastifyRequest, reply: FastifyReply) => {
        try {
          await req.jwtVerify();
        } catch (error) {
          reply.status(401).send({ message: "Unauthorized" });
        }
      }
    );
  },
  {
    name: "authenticate-plugin",
  }
);

export default authenticatePlugin;

declare module "fastify" {
  interface FastifyInstance {
    authenticate(request: FastifyRequest, reply: FastifyReply): Promise<void>;
  }
}
