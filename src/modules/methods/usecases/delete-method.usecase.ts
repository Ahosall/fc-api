import { NotFoundError } from "@shared/errors/NotFoundError";
import { MethodRepository } from "../repositories/MethodRepository";

export class DeleteMethodUseCase {
  constructor(private readonly MethodRepository: MethodRepository) {}

  async execute(id: string, userId: string) {
    const found = this.MethodRepository.get(id, userId);
    if (!found) {
      throw new NotFoundError("Forma de pagamento não encontrada");
    }

    await this.MethodRepository.delete(id, userId);
  }
}
