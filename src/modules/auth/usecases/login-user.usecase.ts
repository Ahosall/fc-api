import bcrypt from "bcrypt";

import { BadRequestError } from "@shared/errors/BadRequestError";
import { AuthRepository } from "../repositories/AuthRepository";
import { JwtRepository } from "../repositories/JwtFastifyRepository";

export interface ILoginUserInput {
  email: string;
  password: string;
}

export class LoginUserUseCase {
  constructor(
    private readonly AuthRepository: AuthRepository,
    private readonly JwtFastifyRepository: JwtRepository
  ) {}

  async execute({ email, password }: ILoginUserInput) {
    const user = await this.AuthRepository.findByEmail(email);
    if (!user) {
      throw new BadRequestError("Invalid credentials");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new BadRequestError("Invalid credentials");
    }

    const token = await this.JwtFastifyRepository.sign({ sub: user.id });

    return {
      token,
      user: {
        name: user.name,
        email: user.email,
      },
    };
  }
}
