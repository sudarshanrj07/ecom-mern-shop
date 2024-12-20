import { Router } from "express";
import userRouter from "./userRoutes.mjs";
import productRouter from "./productRoutes.mjs";

const router = Router();

router.use("/api/users", userRouter);
router.use("/api/products", productRouter);

export default router;
