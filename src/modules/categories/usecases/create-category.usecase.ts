import { CategoryRepository } from "../repositories/CategoryRepository";

export interface ICreateCategoryInput {
  name: string;
  type: "INCOME" | "EXPENSE";
}

export class CreateCategoryUseCase {
  constructor(private readonly CategoryRepository: CategoryRepository) {}

  async execute(data: ICreateCategoryInput, userId: string) {
    await this.CategoryRepository.create({ ...data, userId });
  }
}
