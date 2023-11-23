export class ErrorUserNotExisting extends Error {
  code = "USER_NOT_EXISTING";
  message = "The user does not exist.";

  constructor(message?: string) {
    super(message ?? "The user does not exist.");

    this.message = message ?? "The user does not exist.";
    this.name = "UserNotExistingError";
  }
}
