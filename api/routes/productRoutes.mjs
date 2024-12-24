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

router.post(
	"/",
	asyncHandler(async (req, res) => {
		const { name, image, description, price, countInStock, rating, numReview } =
			req.body;
		const prodcut = await Product.create({
			name,
			image,
			description,
			rating,
			numReview,
			price,
			countInStock,
		});
		if (!prodcut) {
			res.status(400);
			throw new Error("Invalid user data");
		}
		res.status(200).json({
			name,
			image,
			description,
			rating,
			numReview,
			price,
			countInStock,
		});
	})
);

export default router;
