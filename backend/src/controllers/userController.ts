import { Request, Response } from "express";
import { User } from "../models/User";
import { AppError } from "../middleware/errorHandling";
import {
  createToken,
  updateUserData,
  passwordMatch,
  createUserData,
} from "../services/UserService";
import { AuthenticatedRequest } from "../middleware/authentication";

const createUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  const existingUser = await User.findOne({ where: { email } });

  if (existingUser) {
    throw new AppError("Email already exists", 400);
  }

  const token = await createUserData(name, email, password);
  res
    .status(200)
    .json({ success: true, message: "User created succesfully", token });
};

const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const existingUser = await User.findOne({ where: { email } });
  if (!existingUser) {
    throw new AppError("User not found", 404);
  }
  passwordMatch(existingUser, password);

  const token = createToken(existingUser.id);
  const user = {
    name: existingUser.name,
    email: existingUser.email,
  };
  res.status(200).json({
    success: true,
    message: "User logged in succesfully",
    user,
    token,
  });
};

const getUser = async (req: AuthenticatedRequest, res: Response) => {
  const { user } = req;
  const existingUser = await User.findOne({
    where: {
      id: user?.id,
    },
    attributes: ["email", "name"],
  });
  if (!existingUser) {
    throw new AppError("User not found", 404);
  }
  res
    .status(200)
    .json({
      success: true,
      message: "User fetched succesfully",
      user: existingUser,
    });
};

const updateUser = async (req: AuthenticatedRequest, res: Response) => {
  const { user } = req;
  const existingUser = await User.findByPk(user?.id);
  if (!existingUser) {
    throw new AppError("User not found", 404);
  }
  const { name, password, currentPassword } = req.body;

  await passwordMatch(existingUser, currentPassword);

  updateUserData(existingUser, password, name);

  await existingUser.save();
  res.status(200).json({ success: true, message: "User updated succesfully" });
};

const deleteUser = async (req: AuthenticatedRequest, res: Response) => {
  const id = req.user?.id;
  const user = await User.findByPk(id);

  if (!user) {
    throw new AppError("User not found", 404);
  }

  await user.destroy();
  res.status(200).json({ success: true, message: "User deleted succesfully" });
};

export { createUser, loginUser, getUser, updateUser, deleteUser };
