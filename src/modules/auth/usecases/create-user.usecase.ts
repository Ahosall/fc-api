import bcrypt from "bcrypt";

import { BadRequestError } from "@shared/errors/BadRequestError";
import { AuthRepository } from "../repositories/AuthRepository";

export interface ICreateUserInput {
  name: string;
  email: string;
  password: string;
}

export class CreateUserUseCase {
  constructor(private readonly AuthRepository: AuthRepository) {}

  async execute(data: ICreateUserInput) {
    const user = await this.AuthRepository.findByEmail(data.email);
    if (user) {
      throw new BadRequestError("This email is already registered");
    }

    const passwordHashed = await bcrypt.hash(data.password, 12);

    await this.AuthRepository.create({
      name: data.name,
      email: data.email,
      password: passwordHashed,
    });
  }
}
