export default {
  jwtSecret: process.env.JWT_SECRET as string,
  expiresIn: process.env.JWT_EXPIRES_IN || "1h",
};
