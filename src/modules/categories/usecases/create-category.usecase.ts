import {
  CategoryRepository,
  ICategoryRepository,
} from "../repositories/CategoryRepository";

export type TCreateCategoryInput = Omit<
  ICategoryRepository,
  "id" | "userId" | "createdAt" | "updatedAt"
>;

export class CreateCategoryUseCase {
  constructor(private readonly CategoryRepository: CategoryRepository) {}

  async execute(data: TCreateCategoryInput, userId: string) {
    await this.CategoryRepository.create({ ...data, userId });
  }
}
