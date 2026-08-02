class ApiError extends Error {
  constructor(statusCode, field, message = "Something went wrong.") {
    super(message);
    this.statusCode = Number(statusCode);
    this.success = false;
    this.field = field;
  }
}

export default ApiError;
