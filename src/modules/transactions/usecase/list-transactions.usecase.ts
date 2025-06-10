import { TransactionRepository } from "../repositories/TransactionRepository";

export class ListTransactionsUseCase {
  constructor(private readonly TransactionsRepository: TransactionRepository) {}

  async execute(userId: string) {
    const transactions = await this.TransactionsRepository.list(userId);

    return transactions;
  }
}
