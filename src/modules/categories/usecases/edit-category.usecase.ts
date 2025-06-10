import { NotFoundError } from "@shared/errors/NotFoundError";
import {
  CategoryRepository,
  ICategoryRepository,
} from "../repositories/CategoryRepository";

type TEditCategoryInput = Omit<
  ICategoryRepository,
  "id" | "userId" | "createdAt"
>;

export class EditCategoryUseCase {
  constructor(private readonly CategoryRepository: CategoryRepository) {}

  async execute(id: string, data: TEditCategoryInput, userId: string) {
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
