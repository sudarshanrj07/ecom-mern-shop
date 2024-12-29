import { Router } from "express";
import asyncHandler from "express-async-handler";
import { userAuth } from "../middleware/auth.mjs";
import { Order } from "../models/Order.mjs";

const router = Router();

//order creation route
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
		const newOrder = new Order({
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
		const saveOrder = await newOrder.save();

		if (!saveOrder) {
			res.status(404);
			throw new Error("Order failed! please try again");
		}

		res.status(200).json(saveOrder);
	})
);

//order payment route
router.put(
	"/:id/payment",
	userAuth,
	asyncHandler(async (req, res) => {
		const {
			params: { id: paramId },
			body: { id: bodyId, email_address, status, updated_time },
		} = req;
		const findOrder = await Order.findById(paramId);
		if (!findOrder) {
			res.status(400);
			throw new Error("Order does not exists");
		}
		findOrder.isPaid = true;
		findOrder.paidAt = Date.now();
		findOrder.paymentResult = {
			id: bodyId,
			status,
			updated_time,
			email_address,
		};

		const saveOrderPayment = await findOrder.save();

		if (!saveOrderPayment) {
			res.status(404);
			throw new Error("Order payment failed");
		}

		res.status(200).json(saveOrderPayment);
	})
);

//get all the orders route
router.get(
	"/",
	userAuth,
	asyncHandler(async (req, res) => {
		const { _id } = req.user;
		const orders = await Order.find({ _id }.sort({ _id: -1 }));
		if (!orders) {
			res.status(404);
			throw new Error("No orders found");
		}

		res.status(200).json(orders);
	})
);

//get order by id
router.get(
	"/:id",
	userAuth,
	asyncHandler(async (req, res) => {
		const { id } = req.params;
		const order = await Order.findById(id).populate("user", "name email");
		if (!order) {
			res.status(404);
			throw new Error("Order doesnt exists");
		}
		res.status(200).json(order);
	})
);

export default router;
