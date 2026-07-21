class ApiResponse {
  constructor(statusCode, data, message) {
    this.statusCode = Number(statusCode) || 500;
    this.success = Number(statusCode) < 400;
    this.data = data;
    this.message = message;
  }
}

export default ApiResponse;
