import { Router } from "express";
import { register } from "../services/auth/auth.controller";

const router = Router();

router.post("/register", register);

export default router;