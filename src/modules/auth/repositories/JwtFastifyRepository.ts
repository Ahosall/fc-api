import { FastifyInstance } from "fastify";

export class JwtRepository {
  constructor(private readonly instance: FastifyInstance) {}

  async sign(payload: { sub: string }): Promise<string> {
    return this.instance.jwt.sign(payload);
  }
}
