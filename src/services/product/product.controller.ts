import { Request, Response } from "express";
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "./product.service";

export const create = async (req: Request, res: Response) => {
  try {
    const product = await createProduct({
      ...req.body,
      price: Number(req.body.price),
      stock: Number(req.body.stock),
      categoryId: Number(req.body.categoryId),
    });

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create product",
      error,
    });
  }
};

export const getAll = async (req: Request, res: Response) => {
  try {
    const products = await getAllProducts();

    res.json({
      success: true,
      message: "Products retrieved successfully",
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve products",
      error,
    });
  }
};

export const getById = async (req: Request, res: Response) => {
  try {
    const product = await getProductById(Number(req.params.id));

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.json({
      success: true,
      message: "Product retrieved successfully",
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve product",
      error,
    });
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const product = await updateProduct(Number(req.params.id), {
      ...req.body,
      ...(req.body.price !== undefined && {
        price: Number(req.body.price),
      }),
      ...(req.body.stock !== undefined && {
        stock: Number(req.body.stock),
      }),
      ...(req.body.categoryId !== undefined && {
        categoryId: Number(req.body.categoryId),
      }),
    });

    res.json({
      success: true,
      message: "Product updated successfully",
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update product",
      error,
    });
  }
};

export const remove = async (req: Request, res: Response) => {
  try {
    await deleteProduct(Number(req.params.id));

    res.json({
      success: true,
      message: "Product deleted successfully",
      data: null,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete product",
      error,
    });
  }
};