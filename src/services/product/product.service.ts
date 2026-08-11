import { prisma } from "../../lib/prisma";

export const createProduct = async (data: {
  name: string;
  description?: string;
  price: number;
  stock: number;
  categoryId: number;
  userId: number;
}) => {
  return prisma.product.create({
    data,
    include: {
      category: true,
    },
  });
};

export const getAllProducts = async () => {
  return prisma.product.findMany({
    where: {
      isDeleted: false,
    },
    include: {
      category: true,
    },
  });
};

export const getProductById = async (id: number) => {
  return prisma.product.findFirst({
    where: {
      id,
      isDeleted: false,
    },
    include: {
      category: true,
    },
  });
};

export const updateProduct = async (
  id: number,
  data: {
    name?: string;
    description?: string;
    price?: number;
    stock?: number;
    categoryId?: number;
  }
) => {
  return prisma.product.update({
    where: { id },
    data,
    include: {
      category: true,
    },
  });
};

export const deleteProduct = async (id: number) => {
  return prisma.product.update({
    where: { id },
    data: {
      isDeleted: true,
    },
  });
};