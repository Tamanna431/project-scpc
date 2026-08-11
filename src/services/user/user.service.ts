import bcrypt from "bcrypt";
import { prisma } from "../../lib/prisma";
import { Role } from "@prisma/client";

interface CreateUserInput {
  name: string;
  email: string;
  password: string;
  role?: Role;
}

interface UpdateUserInput {
  name?: string;
  email?: string;
  password?: string;
  role?: Role;
}

export const createUser = async (payload: CreateUserInput) => {
  const { name, email, password, role } = payload;

  // Check if email already exists
  const existingUser = await prisma.user.findFirst({
    where: {
      email,
      isDeleted: false,
    },
  });

  if (existingUser) {
    throw new Error("User already exists with this email");
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create user
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role: role || Role.USER,
    },
  });

  const { password: _, ...userWithoutPassword } = user;
  return userWithoutPassword;
};

export const getAllUsers = async () => {
  const users = await prisma.user.findMany({
    where: {
      isDeleted: false,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return users.map(({ password: _, ...userWithoutPassword }) => userWithoutPassword);
};

export const getUserById = async (id: number) => {
  const user = await prisma.user.findFirst({
    where: {
      id,
      isDeleted: false,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const { password: _, ...userWithoutPassword } = user;
  return userWithoutPassword;
};

export const updateUser = async (id: number, payload: UpdateUserInput) => {
  // Check if user exists
  const existingUser = await prisma.user.findFirst({
    where: {
      id,
      isDeleted: false,
    },
  });

  if (!existingUser) {
    throw new Error("User not found");
  }

  // If email is being changed, check if it's already taken
  if (payload.email && payload.email !== existingUser.email) {
    const emailTaken = await prisma.user.findFirst({
      where: {
        email: payload.email,
        isDeleted: false,
      },
    });

    if (emailTaken) {
      throw new Error("Email already taken");
    }
  }

  const updateData: any = { ...payload };

  // Hash password if updated
  if (payload.password) {
    updateData.password = await bcrypt.hash(payload.password, 10);
  }

  const updatedUser = await prisma.user.update({
    where: {
      id,
    },
    data: updateData,
  });

  const { password: _, ...userWithoutPassword } = updatedUser;
  return userWithoutPassword;
};

export const deleteUser = async (id: number) => {
  const existingUser = await prisma.user.findFirst({
    where: {
      id,
      isDeleted: false,
    },
  });

  if (!existingUser) {
    throw new Error("User not found");
  }

  const deletedUser = await prisma.user.update({
    where: {
      id,
    },
    data: {
      isDeleted: true,
    },
  });

  const { password: _, ...userWithoutPassword } = deletedUser;
  return userWithoutPassword;
};
