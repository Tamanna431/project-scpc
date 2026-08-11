import { prisma } from "../../lib/prisma";

interface CreateCategoryInput {
  name: string;
  description?: string;
}

export const createCategory = async (
  payload: CreateCategoryInput
) => {
  const { name, description } = payload;

  const existingCategory = await prisma.category.findFirst({
    where: {
      name,
      isDeleted: false,
    },
  });

  if (existingCategory) {
    throw new Error("Category already exists");
  }

  const category = await prisma.category.create({
    data: {
      name,
      description,
    },
  });

  return category;
};

export const getAllCategories = async () => {
  const categories = await prisma.category.findMany({
    where: {
      isDeleted: false,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return categories;
};

export const getCategoryById = async (id: number) => {
  const category = await prisma.category.findFirst({
    where: {
      id,
      isDeleted: false,
    },
  });

  if (!category) {
    throw new Error("Category not found");
  }

  return category;
};

export const updateCategory = async (
  id: number,
  payload: {
    name?: string;
    description?: string;
  }
) => {
  const category = await prisma.category.findFirst({
    where: {
      id,
      isDeleted: false,
    },
  });

  if (!category) {
    throw new Error("Category not found");
  }

  const updatedCategory = await prisma.category.update({
    where: {
      id,
    },
    data: payload,
  });

  return updatedCategory;
};

export const deleteCategory = async (id: number) => {
  const category = await prisma.category.findFirst({
    where: {
      id,
      isDeleted: false,
    },
  });

  if (!category) {
    throw new Error("Category not found");
  }

  const deletedCategory = await prisma.category.update({
    where: {
      id,
    },
    data: {
      isDeleted: true,
    },
  });

  return deletedCategory;
};