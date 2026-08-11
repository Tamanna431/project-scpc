import express from "express";
import cors from "cors";
import { prisma } from "./lib/prisma";
import authRoutes from "./routes/auth.route";
import productRoutes from "./services/product/product.route";
import {
  authMiddleware,
  AuthRequest,
} from "./middleware/auth.middleware";
import categoryRoutes from "./services/category/category.route";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "SCIC Backend Server is running",
  });
});

app.use("/api/auth", authRoutes);
app.get(
  "/api/protected",
  authMiddleware,
  (req: AuthRequest, res) => {
    res.json({
      success: true,
      message: "You can access this protected route",
      data: {
        user: req.user,
      },
    });
  }
);

export default app;