import { NotFoundError } from "@shared/errors/NotFoundError";
import { MethodRepository } from "../repositories/MethodRepository";

export class GetMethodUseCase {
  constructor(private readonly MethodRepository: MethodRepository) {}

  async execute(id: string, userId: string) {
    const method = await this.MethodRepository.get(id, userId);
    if (!method) {
      throw new NotFoundError("Forma de pagamento não encontrada");
    }

    return method;
  }
}
