import apiError from "../utils/ApiError.js";

export const validate = (schema, source = "body") => {
  return (req, res, next) => {
    const result = schema.safeParse(req[source]);

    if (!result.success) {
      const message = result.error.issues[0].message;
      return next(new apiError(400, message));
    }

    if (source === "query") {
      req.validatedQuery = result.data;
    } else if (source === "params") {
      req.validatedParams = result.data;
    } else {
      req.validatedBody = result.data;
    }
    next();
  };
};
