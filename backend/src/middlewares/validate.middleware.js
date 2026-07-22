import apiError from "../utils/ApiError.js";

export const validate = (schema) => {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const message = result.error.issues[0].message;
      return next(new apiError(400, message));
    }

    req.validatedData = result.data;
    next();
  };
};
