import { NotFoundError } from "@shared/errors/NotFoundError";
import { CategoryRepository } from "../repositories/CategoryRepository";

export interface IEditCategoryInput {
  name: string;
  type: "INCOME" | "EXPENSE";
}

export class EditCategoryUseCase {
  constructor(private readonly CategoryRepository: CategoryRepository) {}

  async execute(id: string, data: IEditCategoryInput, userId: string) {
    const found = await this.CategoryRepository.get(id, userId);
    if (!found) {
      throw new NotFoundError("A categoria não existe");
    }

    const categoryUpdated = await this.CategoryRepository.edit(id, {
      ...data,
      userId,
    });

    return categoryUpdated;
  }
}
