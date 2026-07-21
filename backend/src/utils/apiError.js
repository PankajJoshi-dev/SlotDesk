class ApiError extends Error {
  constructor(statusCode, message = "Something went wrong.") {
    super(message);
    this.statusCode = Number(statusCode);
    this.success = false;
  }
}

export default ApiError;
