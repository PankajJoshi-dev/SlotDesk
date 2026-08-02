import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import User from "../models/user.model.js";
import { generateAccessToken } from "../utils/generateToken.js";

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
};

const registerUser = asyncHandler(async (req, res) => {
  const { fullName, email, address, password, confirmPassword } =
    req.validatedBody;

  if (password !== confirmPassword) {
    throw new ApiError(400, "password", "Passwords do not match.");
  }

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new ApiError(409, "A user with this email already exists.");
  }

  const user = await User.create({
    fullName,
    email,
    address,
    password,
  });

  const createdUser = user.toObject();
  delete createdUser.password;

  const accessToken = generateAccessToken(user._id);

  return res
    .cookie("accessToken", accessToken, cookieOptions)
    .status(201)
    .json(new ApiResponse(201, createdUser, "User registered successfully."));
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.validatedBody;

  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.comparePassword(password))) {
    throw new ApiError(401, "Invalid email or password.");
  }

  const accessToken = generateAccessToken(user._id);

  const loggedInUser = user.toObject();
  delete loggedInUser.password;

  return res
    .cookie("accessToken", accessToken, cookieOptions)
    .status(200)
    .json(new ApiResponse(200, loggedInUser, "User login successful."));
});

const logoutUser = asyncHandler(async (req, res) => {
  res
    .clearCookie("accessToken", cookieOptions)
    .status(200)
    .json(new ApiResponse(200, null, "User logout successful."));
});

const getCurrentUser = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .json(new ApiResponse(200, req.user, "Current user fetched successfully."));
});

export { registerUser, loginUser, logoutUser, getCurrentUser };
