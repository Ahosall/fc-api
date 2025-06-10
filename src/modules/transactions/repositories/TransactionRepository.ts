import { prisma } from "@shared/database/prisma";

export class TransactionRepository {
  async list(userId: string) {
    const transactions = prisma.transaction.findMany({ where: { userId } });

    return transactions;
  }
}
