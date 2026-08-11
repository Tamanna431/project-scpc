import { Request, Response } from "express";

import {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} from "./category.service";

export const create = async (
  req: Request,
  res: Response
) => {
  try {
    const category = await createCategory(req.body);

    res.status(201).json({
      success: true,
      message: "Category created successfully",
      data: category,
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
    const categories = await getAllCategories();

    res.status(200).json({
      success: true,
      message: "Categories retrieved successfully",
      data: categories,
    });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Something went wrong";

    res.status(500).json({
      success: false,
      message,
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
        message: "Invalid category ID",
        data: null,
      });
    }

    const category = await getCategoryById(id);

    res.status(200).json({
      success: true,
      message: "Category retrieved successfully",
      data: category,
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

export const update = async (
  req: Request,
  res: Response
) => {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid category ID",
        data: null,
      });
    }

    const category = await updateCategory(
      id,
      req.body
    );

    res.status(200).json({
      success: true,
      message: "Category updated successfully",
      data: category,
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

    if (Number.isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid category ID",
        data: null,
      });
    }

    await deleteCategory(id);

    res.status(200).json({
      success: true,
      message: "Category deleted successfully",
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