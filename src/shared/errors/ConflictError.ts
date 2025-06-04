import { BaseError } from "./BaseError";

export class ConflictError extends BaseError {
  constructor(message = "Conflict occurred") {
    super(message, 409);
  }
}
