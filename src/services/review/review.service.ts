import { prisma } from "../../lib/prisma";

interface CreateReviewInput {
  rating: number;
  comment?: string;
  userId: number;
  productId: number;
}

export const createReview = async (data: CreateReviewInput) => {
  const product = await prisma.product.findFirst({
    where: {
      id: data.productId,
      isDeleted: false,
    },
  });

  if (!product) {
    throw new Error("Product not found");
  }

  return prisma.review.create({
    data: {
      rating: data.rating,
      comment: data.comment,
      userId: data.userId,
      productId: data.productId,
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      product: true,
    },
  });
};

export const getAllReviews = async () => {
  return prisma.review.findMany({
    where: {
      isDeleted: false,
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      product: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const getReviewById = async (id: number) => {
  return prisma.review.findFirst({
    where: {
      id,
      isDeleted: false,
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      product: true,
    },
  });
};

export const updateReview = async (
  id: number,
  data: {
    rating?: number;
    comment?: string;
    status?: "PENDING" | "APPROVED" | "REJECTED";
  }
) => {
  const review = await prisma.review.findFirst({
    where: {
      id,
      isDeleted: false,
    },
  });

  if (!review) {
    throw new Error("Review not found");
  }

  return prisma.review.update({
    where: { id },
    data,
  });
};

export const deleteReview = async (id: number) => {
  const review = await prisma.review.findFirst({
    where: {
      id,
      isDeleted: false,
    },
  });

  if (!review) {
    throw new Error("Review not found");
  }

  return prisma.review.update({
    where: { id },
    data: {
      isDeleted: true,
    },
  });
};