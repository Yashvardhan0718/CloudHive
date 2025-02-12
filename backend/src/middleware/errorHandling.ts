import { Request, Response, NextFunction } from "express";

class ValidationError extends Error {
  statusCode: number;
  constructor(message: string) {
    super(message);
    this.name = "ValidationError";
    this.statusCode = 400;
  }
}

class AppError extends Error {
  statusCode: number;

  constructor(message: string, statusCode = 500) {
    super(message);
    this.name = "AppError";
    this.statusCode = statusCode;
  }
}

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
  next: NextFunction
) => {
  if (err instanceof AppError) {
    return res
      .status(err.statusCode)
      .json({ success: false, message: err.message });
  } else if (err instanceof ValidationError) {
    return res
      .status(err.statusCode)
      .json({ success: false, message: err.message });
  }
  console.log(err);
  return res
    .status(500)
    .json({ success: false, message: "Something went wrong" });
};

const notFound = (req: Request, res: Response) => {
  return res
    .status(404)
    .json({ success: false, message: "Resource not found" });
};

export { AppError, errorHandler, notFound, ValidationError };
