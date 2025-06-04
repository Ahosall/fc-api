import { prisma } from "@shared/database/prisma";

export interface IUserCreateRepository {
  name: string;
  email: string;
  password: string;
}

export class AuthRepository {
  async create(data: IUserCreateRepository) {
    await prisma.user.create({ data });
  }

  async getById(id: string) {
    const user = await prisma.user.findUnique({ where: { id } });

    return user;
  }

  async findByEmail(email: string) {
    const user = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });

    return user;
  }
}
