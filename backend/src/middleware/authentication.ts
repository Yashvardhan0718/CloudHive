import { Request, Response, NextFunction } from "express";
import { AppError } from "./errorHandling";
import { validator } from "../services/UserService";

export interface AuthenticatedRequest extends Request {
  user?: { id: string };
}

export const authenticate = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers["auth-token"];
  if (!token) {
    throw new AppError("Token not found", 401);
  }
  const authToken = Array.isArray(token) ? token[0] : token;
  const data = validator(authToken);
  if (!data) {
    throw new AppError("Invalid token", 401);
  }
  req.user = data.user;
  next();
};
