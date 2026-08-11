import { prisma } from "../../lib/prisma";

export const createOrder = async (data: {
  quantity: number;
  userId: number;
  productId: number;
}) => {
  const product = await prisma.product.findFirst({
    where: {
      id: data.productId,
      isDeleted: false,
    },
  });

  if (!product) {
    throw new Error("Product not found");
  }

  if (product.stock < data.quantity) {
    throw new Error("Insufficient stock");
  }

  const total = product.price * data.quantity;

  const order = await prisma.order.create({
    data: {
      quantity: data.quantity,
      total,
      userId: data.userId,
      productId: data.productId,
    },
    include: {
      product: true,
    },
  });

  // Reduce stock
  await prisma.product.update({
    where: {
      id: data.productId,
    },
    data: {
      stock: {
        decrement: data.quantity,
      },
    },
  });

  return order;
};

export const getAllOrders = async () => {
  return prisma.order.findMany({
    where: {
      isDeleted: false,
    },
    include: {
      product: true,
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const getOrderById = async (id: number) => {
  return prisma.order.findFirst({
    where: {
      id,
      isDeleted: false,
    },
    include: {
      product: true,
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });
};

export const updateOrder = async (
  id: number,
  status: "PENDING" | "CONFIRMED" | "SHIPPED" | "DELIVERED" | "CANCELLED"
) => {
  return prisma.order.update({
    where: {
      id,
    },
    data: {
      status,
    },
  });
};

export const deleteOrder = async (id: number) => {
  return prisma.order.update({
    where: {
      id,
    },
    data: {
      isDeleted: true,
    },
  });
};