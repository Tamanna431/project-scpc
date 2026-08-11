import express from "express";
import cors from "cors";
import path from "path";
import { prisma } from "./lib/prisma";
import authRoutes from "./routes/auth.route";
import productRoutes from "./services/product/product.route";
import {
  authMiddleware,
  AuthRequest,
} from "./middleware/auth.middleware";
import categoryRoutes from "./services/category/category.route";
import reviewRoutes from "./services/review/review.route";
import orderRoutes from "./services/order/order.route";
import userRoutes from "./services/user/user.route";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/docs", express.static(path.join(__dirname, "public")));
app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/users", userRoutes);


app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "SCIC Backend Server is running",
    documentationUrl: `${req.protocol}://${req.get("host")}/docs`,
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