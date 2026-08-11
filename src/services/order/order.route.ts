import { Router } from "express";

import {
  create,
  getAll,
  getById,
  update,
  remove,
} from "./order.controller";

import { authMiddleware } from "../../middleware/auth.middleware";

const router = Router();

router.post("/", authMiddleware, create);

router.get("/", authMiddleware, getAll);

router.get("/:id", authMiddleware, getById);

router.patch("/:id", authMiddleware, update);

router.delete("/:id", authMiddleware, remove);

export default router;