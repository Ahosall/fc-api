import { prisma } from "@shared/database/prisma";

export interface ICategoryCreateRepository {
  name: string;
  type: "INCOME" | "EXPENSE";
  userId: string;
}

export class CategoryRepository {
  async list(userId: string) {
    const categories = await prisma.category.findMany({ where: { userId } });

    return categories;
  }

  async create(data: ICategoryCreateRepository) {
    await prisma.category.create({ data });
  }
}
