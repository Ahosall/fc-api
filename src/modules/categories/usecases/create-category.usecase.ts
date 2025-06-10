import {
  CategoryRepository,
  ICategoryRepository,
} from "../repositories/CategoryRepository";

type TCreateCategoryInput = Omit<
  ICategoryRepository,
  "id" | "userId" | "createdAt"
>;

export class CreateCategoryUseCase {
  constructor(private readonly CategoryRepository: CategoryRepository) {}

  async execute(data: TCreateCategoryInput, userId: string) {
    await this.CategoryRepository.create({ ...data, userId });
  }
}
