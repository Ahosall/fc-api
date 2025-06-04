import { BaseError } from "./BaseError";

export class UnauthorizedError extends BaseError {
  constructor(message = "Unauthorized user") {
    super(message, 401);
  }
}
