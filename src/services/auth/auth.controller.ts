import { Request, Response } from "express";
import {
  registerUser,
  loginUser,
} from "./auth.service";


export const register = async (
  req: Request,
  res: Response
) => {
  try {
    const user = await registerUser(req.body);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: user,
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
export const login = async (
  req: Request,
  res: Response
) => {
  try {
    const result = await loginUser(req.body);

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: result,
    });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Something went wrong";

    res.status(401).json({
      success: false,
      message,
      data: null,
    });
  }
};