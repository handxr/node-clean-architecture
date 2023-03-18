import { Request, Response, NextFunction } from "express";

export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  let statusCode = err.status || 500;
  let message = "Unknown error";

  if (err instanceof Error) {
    message = err.message;
  }

  return res.status(statusCode).json({ message });
}
