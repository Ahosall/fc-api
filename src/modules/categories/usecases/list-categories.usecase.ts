import { CategoryRepository } from "../repositories/CategoryRepository";

export class ListCategoriesUseCase {
  constructor(private readonly CategoryRepository: CategoryRepository) {}

  async execute(userId: string) {
    const categories = await this.CategoryRepository.list(userId);
    return categories;
  }
}
