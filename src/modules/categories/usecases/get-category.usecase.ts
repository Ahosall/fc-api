import { CategoryRepository } from "../repositories/CategoryRepository";

export class GetCategoryUseCase {
  constructor(private readonly CategoryRepository: CategoryRepository) {}

  async execute(id: string, userId: string) {
    const category = await this.CategoryRepository.get(id, userId);

    return category;
  }
}
