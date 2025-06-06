import { prisma } from "@shared/database/prisma";

export interface ICategoryRepository {
  id: string;
  name: string;
  type: "INCOME" | "EXPENSE";
  userId: string;
  createdAt: string;
  updatedAt: string;
}

type TCategoryInput = Omit<
  ICategoryRepository,
  "id" | "createdAt" | "updatedAt"
>;

export class CategoryRepository {
  async list(userId: string) {
    const categories = await prisma.category.findMany({ where: { userId } });

    return categories;
  }

  async create(data: TCategoryInput) {
    await prisma.category.create({ data });
  }

  async get(id: string, userId: string) {
    const category = await prisma.category.findFirst({ where: { id, userId } });
    return category;
  }

  async edit(id: string, data: TCategoryInput) {
    const category = await prisma.category.update({
      data,
      where: { id, userId: data.userId },
    });

    return category;
  }

  async delete(id: string, userId: string) {
    await prisma.category.delete({ where: { id, userId } });
  }
}
