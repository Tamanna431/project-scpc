import { Request, Response } from "express";

import {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
} from "./order.service";

import { AuthRequest } from "../../middleware/auth.middleware";

export const create = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
        data: null,
      });
    }

    const order = await createOrder({
      quantity: Number(req.body.quantity),
      productId: Number(req.body.productId),
      userId: Number(req.user.userId),
    });

    res.status(201).json({
      success: true,
      message: "Order created successfully",
      data: order,
    });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Something went wrong";

    res.status(400).json({
      success: false,
      message,
      data: null,
    });
  }
};

export const getAll = async (
  req: Request,
  res: Response
) => {
  try {
    const orders = await getAllOrders();

    res.json({
      success: true,
      message: "Orders retrieved successfully",
      data: orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve orders",
      data: null,
    });
  }
};

export const getById = async (
  req: Request,
  res: Response
) => {
  try {
    const order = await getOrderById(
      Number(req.params.id)
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
        data: null,
      });
    }

    res.json({
      success: true,
      message: "Order retrieved successfully",
      data: order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve order",
      data: null,
    });
  }
};

export const update = async (
  req: Request,
  res: Response
) => {
  try {
    const order = await updateOrder(
      Number(req.params.id),
      req.body.status
    );

    res.json({
      success: true,
      message: "Order updated successfully",
      data: order,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to update order",
      data: null,
    });
  }
};

export const remove = async (
  req: Request,
  res: Response
) => {
  try {
    await deleteOrder(Number(req.params.id));

    res.json({
      success: true,
      message: "Order deleted successfully",
      data: null,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to delete order",
      data: null,
    });
  }
};