export const validate = (schema, source = "body") => {
  return (req, res, next) => {
    const result = schema.safeParse(req[source]);

    if (!result.success) {
      const issue = result.error.issues[0];

      return res.status(400).json({
        success: false,
        field: issue.path[0],
        message: issue.message,
      });
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
