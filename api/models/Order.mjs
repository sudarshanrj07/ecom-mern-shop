import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
	name: { type: String, required: true },
	quantity: { type: Number, required: true },
	image: { type: String, required: true },
	price: { type: Number, required: true },
	product: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: "Product",
	},
});

const orderSchema = new mongoose.Schema(
	{
		user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
		orderItems: [orderItemSchema],
		shippingAddress: {
			address: { type: String, required: true },
			city: { type: String, required: true },
			pincode: { type: String, required: true },
			state: { type: String, required: true },
			country: { type: String, required: true },
		},
		paymentMethod: { type: String, required: true, default: "Paypal" },
		paymentResult: {
			id: { type: String },
			status: { type: String },
			updated_time: { type: String },
			email_address: { type: String },
		},
		taxPrice: {
			type: Number,
			required: true,
			default: 0.0,
		},
		shippingPrice: {
			type: Number,
			required: true,
			default: 0.0,
		},
		totalPrice: {
			type: Number,
			required: true,
			default: 0.0,
		},
		isPaid: {
			type: Boolean,
			default: false,
		},
		paidAt: {
			type: Date,
		},
		isDelivered: {
			type: Boolean,
			default: false,
		},
		deliveredAt: {
			type: Date,
		},
	},
	{ timestamps: true }
);

export const Order = mongoose.model("Order", orderSchema);
