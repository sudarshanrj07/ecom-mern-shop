import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		isAdmin: { type: Boolean, default: false },
	},
	{ timestamps: true }
);

userSchema.methods.matchPassword = async function (entredPassword) {
	return await bcrypt.compare(entredPassword, this.password);
};

userSchema.pre("save", async function (next) {
	if (!this.isModified("password")) next();
	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
});

export const User = mongoose.model("User", userSchema);
