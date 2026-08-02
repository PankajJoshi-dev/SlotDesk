const errorHandler = (err, req, res, next) => {
  const isDevelopment = process.env.NODE_ENV !== "production";
  const statusCode = Number(err.statusCode) || 500;
  const field = err.field || null;
  const message = err.message || "Internal server error.";

  const response = {
    success: false,
    statusCode,
    field,
    message,
  };

  if (isDevelopment) {
    response.stack = err.stack;
  }

  res.status(statusCode).json(response);
};

export default errorHandler;
