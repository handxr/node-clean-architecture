export default {
  jwtSecret: (process.env.JWT_SECRET as string) || "personaje123",
  expiresIn: process.env.JWT_EXPIRES_IN || "1h",
};
