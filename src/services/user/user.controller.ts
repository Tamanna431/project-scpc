import { Request, Response } from "express";
import {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "./user.service";

export const create = async (req: Request, res: Response) => {
  try {
    const user = await createUser(req.body);

    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: user,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Something went wrong";

    res.status(400).json({
      success: false,
      message,
      data: null,
    });
  }
};

export const getAll = async (req: Request, res: Response) => {
  try {
    const users = await getAllUsers();

    res.status(200).json({
      success: true,
      message: "Users retrieved successfully",
      data: users,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Something went wrong";

    res.status(500).json({
      success: false,
      message,
      data: null,
    });
  }
};

export const getById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID",
        data: null,
      });
    }

    const user = await getUserById(id);

    res.status(200).json({
      success: true,
      message: "User retrieved successfully",
      data: user,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Something went wrong";

    res.status(404).json({
      success: false,
      message,
      data: null,
    });
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID",
        data: null,
      });
    }

    const user = await updateUser(id, req.body);

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: user,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Something went wrong";

    res.status(400).json({
      success: false,
      message,
      data: null,
    });
  }
};

export const remove = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID",
        data: null,
      });
    }

    await deleteUser(id);

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
      data: null,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Something went wrong";

    res.status(404).json({
      success: false,
      message,
      data: null,
    });
  }
};
