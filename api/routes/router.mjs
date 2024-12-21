import { Router } from "express";
import userRouter from "./userRoutes.mjs";
import productRouter from "./productRoutes.mjs";
import orderRouter from "./orderRoutes.mjs";

const router = Router();

router.use("/api/users", userRouter);
router.use("/api/products", productRouter);
router.use("/api/orders", orderRouter);

export default router;
