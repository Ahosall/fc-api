import { prisma } from "@shared/database/prisma";

export class CategoryRepository {
  async list(userId: string) {
    const categories = await prisma.category.findMany({ where: { userId } });

    return categories;
  }
}
