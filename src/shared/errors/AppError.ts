/**
 * Class AppError
 * Use a constructor that return a message with a error to middleware,
 * Returns a statusCode with an error 400.
 */
class AppError {
  public readonly message: string;
  public readonly statusCode: number;

  constructor(message: string, statusCode = 400) {
    this.message = message;
    this.statusCode = statusCode;
  }
}

export default AppError;
