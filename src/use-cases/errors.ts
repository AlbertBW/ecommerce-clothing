export class PublicError extends Error {
  constructor(message: string) {
    super(message);
  }
}

export class NotFoundError extends PublicError {
  constructor(message: string) {
    super(message);
    this.name = "NotFoundError";
  }
}
