import jwt from "jsonwebtoken";
import ApiError from "../utils/ApiError.js";
import User from "../models/user.model.js";

const verifyJWT = async (req, res, next) => {
  try {
    const token = req.cookies.accessToken;
    if (!token) {
      throw new ApiError(400, "No Access Token.");
    }
    const userId = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET).id;
    req.user = await User.findById(userId).select("-password");
    if (!userId || !req.user) {
      throw new ApiError(400, "Invalid token");
    }
    next();
  } catch (error) {
    throw new ApiError(409, error.message);
  }
};

export default verifyJWT;
