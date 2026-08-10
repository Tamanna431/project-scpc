import bcrypt from "bcrypt";
import { prisma } from "../../lib/prisma";

interface RegisterInput {
  name: string;
  email: string;
  password: string;
}

export const registerUser = async (payload: RegisterInput) => {
  const { name, email, password } = payload;

  // 1. Check existing user
  const existingUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (existingUser) {
    throw new Error("User already exists with this email");
  }

  // 2. Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // 3. Create user
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  // 4. Don't return password
  const { password: _, ...userWithoutPassword } = user;

  return userWithoutPassword;
};