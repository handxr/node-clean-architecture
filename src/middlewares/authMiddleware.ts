// src/middlewares/authMiddleware.ts
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import jwtConfig from "../config/auth";

interface TokenPayload {
  id: number;
  iat: number;
  exp: number;
}

export default function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const { authorization } = req.headers;

  if (!authorization) {
    res.status(401).json({ message: "Acceso no autorizado" });
    return;
  }

  const token = authorization.split(" ")[1];

  try {
    const decoded = jwt.verify(token, jwtConfig.jwtSecret) as TokenPayload;
    req.userId = decoded.id;
    next();
  } catch {
    res.status(401).json({ message: "Token inválido o expirado" });
  }
}
