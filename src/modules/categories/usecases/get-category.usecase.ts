import { NotFoundError } from "@shared/errors/NotFoundError";
import { CategoryRepository } from "../repositories/CategoryRepository";

export class GetCategoryUseCase {
  constructor(private readonly CategoryRepository: CategoryRepository) {}

  async execute(id: string, userId: string) {
    const found = await this.CategoryRepository.get(id, userId);
    if (!found) {
      throw new NotFoundError("A categoria não existe");
    }

    return found;
  }
}
