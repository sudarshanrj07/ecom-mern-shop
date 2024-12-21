import { Router } from "express";
import asyncHandler from "express-async-handler";
import { userAuth } from "../middleware/auth.mjs";
import { Order } from "../models/Order.mjs";

const router = Router();

router.post(
	"/",
	userAuth,
	asyncHandler(async (req, res) => {
		const {
			orderItems,
			shippingAddress,
			paymentMethods,
			shippingPrice,
			taxPrice,
			totalPrice,
			price,
		} = req.body;

		if (orderItems && orderItems.length === 0) {
			res.status(400);
			throw new Error("No order items found!");
		}
		const newOrder = await Order({
			orderItems,
			shippingAddress,
			paymentMethods,
			shippingPrice,
			taxPrice,
			totalPrice,
			price,
			user: req.user._id,
		});

		if (!newOrder) {
			res.status(404);
			throw new Error("Order failed! please try again");
		}
		const saveOrder = newOrder.save();

		if (!saveOrder) {
			res.status(404);
			throw new Error("Order failed! please try again");
		}

		res.status(200).json(saveOrder);
	})
);

export default router;
