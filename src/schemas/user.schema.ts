import { z } from "zod";

const UserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().optional(),
});

export default UserSchema;
