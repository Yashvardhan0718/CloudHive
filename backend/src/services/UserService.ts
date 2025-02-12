import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import becryptjs from "bcryptjs";
import { User } from "../models/User";
import { AppError } from "../middleware/errorHandling";

dotenv.config();

const jwtSecret = process.env.jwt_secret!;

interface TokenData {
  user: {
    id: string;
  };
}

const createToken = (id: string) => {
  const tokenData: TokenData = {
    user: {
      id,
    },
  };
  const token = jwt.sign(tokenData, jwtSecret);
  return token;
};

const validator = (token: string): TokenData | null => {
  try {
    const data = jwt.verify(token, jwtSecret) as TokenData;
    return data;
  } catch (error) {
    return null;
  }
};

const generateHashPassword = (password: string) => {
  const salt = becryptjs.genSaltSync(10);
  return becryptjs.hashSync(password, salt);
};

const updateUserData = (
  user: User,
  password: string | undefined,
  name: string | undefined
) => {
  if (password) {
    user.password = generateHashPassword(password);
  }
  if (name) {
    user.name = name;
  }
};

const passwordMatch = (user: User, password: string) => {
  const compare = becryptjs.compareSync(password, user.password);
  if (!compare) {
    throw new AppError("Invalid password", 400);
  }
};

const createUserData = async (
  name: string,
  email: string,
  password: string
): Promise<string> => {
  const newUser = {
    name,
    email,
    password: generateHashPassword(password),
  };
  try {
    const { id } = await User.create(newUser);
    const token = createToken(id);
    return token;
  } catch (error) {
    throw new AppError("Error creating user", 500);
  }
};

export {
  createToken,
  validator,
  generateHashPassword,
  updateUserData,
  passwordMatch,
  createUserData,
};
