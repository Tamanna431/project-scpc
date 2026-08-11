import { Request, Response } from "express";

import {
  createReview,
  getAllReviews,
  getReviewById,
  updateReview,
  deleteReview,
} from "./review.service";

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

    const review = await createReview({
      rating: Number(req.body.rating),
      comment: req.body.comment,
      userId: Number(req.user.userId),
      productId: Number(req.body.productId),
    });

    res.status(201).json({
      success: true,
      message: "Review created successfully",
      data: review,
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
    const reviews = await getAllReviews();

    res.status(200).json({
      success: true,
      message: "Reviews retrieved successfully",
      data: reviews,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve reviews",
      data: null,
    });
  }
};

export const getById = async (
  req: Request,
  res: Response
) => {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid review ID",
        data: null,
      });
    }

    const review = await getReviewById(id);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
        data: null,
      });
    }

    res.status(200).json({
      success: true,
      message: "Review retrieved successfully",
      data: review,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve review",
      data: null,
    });
  }
};

export const update = async (
  req: Request,
  res: Response
) => {
  try {
    const id = Number(req.params.id);

    const review = await updateReview(id, {
      ...(req.body.rating !== undefined && {
        rating: Number(req.body.rating),
      }),
      ...(req.body.comment !== undefined && {
        comment: req.body.comment,
      }),
      ...(req.body.status !== undefined && {
        status: req.body.status,
      }),
    });

    res.status(200).json({
      success: true,
      message: "Review updated successfully",
      data: review,
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

export const remove = async (
  req: Request,
  res: Response
) => {
  try {
    const id = Number(req.params.id);

    await deleteReview(id);

    res.status(200).json({
      success: true,
      message: "Review deleted successfully",
      data: null,
    });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Something went wrong";

    res.status(404).json({
      success: false,
      message,
      data: null,
    });
  }
};