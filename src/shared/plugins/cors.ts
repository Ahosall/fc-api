import fp from "fastify-plugin";
import fastifyCors from "@fastify/cors";

import { FastifyInstance } from "fastify";

const corsPlugin = fp(
  async (instance: FastifyInstance) => {
    instance.register(fastifyCors, {
      origin: true,
      methods: ["GET", "PUT", "POST", "DELETE"],
      allowedHeaders: ["accept", "content-type", "authorization"],
    });
  },
  { name: "cors-plugin" }
);

export default corsPlugin;
