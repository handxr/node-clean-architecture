import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import jwtConfig from "../../config/auth";
import authMiddleware from "../../middlewares/authMiddleware";

const mockRequest = (token?: string): Partial<Request> => ({
  headers: {
    authorization: token ? `Bearer ${token}` : undefined,
  },
});

const mockResponse = (): Partial<Response> => {
  const res: any = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

const mockNextFunction = (): NextFunction => {
  return jest.fn() as NextFunction;
};

describe("authMiddleware", () => {
  it("should return 401 if authorization header is missing", () => {
    const req = mockRequest();
    const res = mockResponse();
    const next = mockNextFunction();

    authMiddleware(req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: "Acceso no autorizado" });
  });

  it("should return 401 if token is invalid or expired", () => {
    const invalidToken = "invalid_token";
    const req = mockRequest(invalidToken);
    const res = mockResponse();
    const next = mockNextFunction();

    authMiddleware(req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      message: "Token inválido o expirado",
    });
  });

  it("should call next function if token is valid", () => {
    const payload = { id: 1, iat: Date.now(), exp: Date.now() + 3600 };
    const validToken = jwt.sign(payload, jwtConfig.jwtSecret);
    const req = mockRequest(validToken);
    const res = mockResponse();
    const next = mockNextFunction();

    authMiddleware(req as Request, res as Response, next);

    expect(req.userId).toEqual(payload.id);
    expect(next).toHaveBeenCalled();
  });
});
