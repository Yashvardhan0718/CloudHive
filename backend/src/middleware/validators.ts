import { body, param, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";
import { ValidationError } from "../middleware/errorHandling";
import { AuthenticatedRequest } from "./authentication";

const createUserValidation = [
  body("name").trim().isLength({ min: 3 }).withMessage("Enter a valid name"),
  body("email").trim().isEmail().withMessage("Enter a valid email"),
  body("password")
    .trim()
    .isLength({ min: 5 })
    .withMessage("Enter a valid password"),
];

const loginUserValidation = [
  body("email").trim().isEmail().withMessage("Enter a valid email"),
  body("password")
    .trim()
    .isLength({ min: 5 })
    .withMessage("Enter a valid password"),
];

const updateUserValidation = [
  body("name")
    .optional()
    .trim()
    .isLength({ min: 3 })
    .withMessage("Enter a valid name"),
  body("password")
    .optional()
    .trim()
    .isLength({ min: 5 })
    .withMessage("Enter a valid password"),
  body("currentPassword")
    .trim()
    .isLength({ min: 5 })
    .withMessage("Enter a valid password"),
];

const presignedUrlValidation = [
  body("fileName")
    .trim()
    .isLength({ min: 2 })
    .withMessage("Enter a valid file name"),
  body("fileType")
    .trim()
    .isLength({ min: 2 })
    .withMessage("Enter a valid file type"),
];

const getAndDeleteFileValidation = [
  param("fileName")
    .trim()
    .isLength({ min: 2 })
    .withMessage("Enter a valid file name"),
];

const handleValidationErrors = (
  req: AuthenticatedRequest | Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new ValidationError(errors.array()[0].msg);
  }
  next();
};

export {
  createUserValidation,
  loginUserValidation,
  presignedUrlValidation,
  getAndDeleteFileValidation,
  updateUserValidation,
  handleValidationErrors,
};
