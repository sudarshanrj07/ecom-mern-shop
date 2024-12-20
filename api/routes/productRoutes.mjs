import { Router } from "express";
import asyncHandler from "express-async-handler";
import { Product } from "../models/products.mjs";

const router = Router();

router.get(
	"/",
	asyncHandler(async (req, res) => {
		const prodcuts = await Product.find({});
		res.json(prodcuts);
	})
);

router.get(
	"/:id",
	asyncHandler(async (req, res) => {
		const { id } = req.params;
		const findProduct = await Product.findById(id);
		if (!findProduct) {
			res.status(404);
			throw new Error("Product no found");
		}
		res.status(200).json(findProduct);
	})
);

export default router;
