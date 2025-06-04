import { NotFoundError } from "@shared/errors/NotFoundError";
import { AuthRepository } from "../repositories/AuthRepository";

interface IMeUserData {
  sub: string;
}

export class MeUserUseCase {
  constructor(private readonly AuthRepository: AuthRepository) {}

  async execute(data: IMeUserData) {
    const user = await this.AuthRepository.getById(data.sub);
    if (!user) {
      throw new NotFoundError("User does not exists");
    }

    return user;
  }
}
