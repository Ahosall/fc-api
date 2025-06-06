import { NotFoundError } from "@shared/errors/NotFoundError";
import { CategoryRepository } from "../repositories/CategoryRepository";

export class DeleteCategoryUseCase {
  constructor(private readonly CategoryRepository: CategoryRepository) {}

  async execute(id: string, userId: string) {
    const found = await this.CategoryRepository.get(id, userId);
    if (!found) {
      throw new NotFoundError("A categoria não existe");
    }

    await this.CategoryRepository.delete(id, userId);
  }
}
