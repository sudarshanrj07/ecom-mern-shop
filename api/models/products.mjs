import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
	name: { type: String, required: true },
	image: { type: String, required: true },
	description: { type: String, required: true },
	rating: { type: Number, required: true, default: 0 },
	numReview: { type: Number, required: true, default: 0 },
	price: { type: Number, required: true, default: 0 },
	countInStock: { type: Number, required: true, default: 0 },
	reviews: [reviewSchema],
});

const reviewSchema = new mongoose.Schema({
	name: { type: String, required: true },
	rating: { type: Number, required: true, default: 0 },
	comment: { type: String, required: true },
	user: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: "User",
	},
});

export const Product = mongoose.model("Product", productSchema);
export const Review = mongoose.model("Review", reviewSchema);
