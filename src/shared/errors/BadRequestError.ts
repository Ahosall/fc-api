import { BaseError } from "./BaseError";

export class BadRequestError extends BaseError {
  constructor(message = "Invalid request") {
    super(message, 400);
  }
}
