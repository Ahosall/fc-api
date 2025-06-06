import { MethodRepository } from "../repositories/MethodRepository";

export class ListMethodsUseCase {
  constructor(private readonly MethodRepository: MethodRepository) {}

  async execute(userId: string) {
    const methods = await this.MethodRepository.list(userId);

    return methods;
  }
}
