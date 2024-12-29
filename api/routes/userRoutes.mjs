import { Router } from "express";
import AsyncHandler from "express-async-handler";
import { User } from "../models/user.mjs";
import { generateToken } from "../tokenGenerate.mjs";
import { userAuth } from "../middleware/auth.mjs";

const router = Router();

//user login
router.post(
	"/login",
	AsyncHandler(async (req, res) => {
		const { email, password } = req.body;
		const findUser = await User.findOne({ email });
		if (findUser && (await findUser.matchPassword(password))) {
			res.json({
				_id: findUser._id,
				name: findUser.name,
				email: findUser.email,
				isAdmin: findUser.isAdmin,
				token: generateToken(findUser._id),
				createdAt: findUser.createdAt,
			});
		} else {
			res.status(401);
			throw new Error("Invalid credentials");
		}
	})
);

//user register
router.post(
	"/",
	AsyncHandler(async (req, res) => {
		const { email, password, name } = req.body;
		const findUser = await User.findOne({ email });
		if (findUser) {
			res.status(400);
			throw new Error("User already exists");
		}
		const newUser = await User.create({
			name,
			email,
			password,
		});

		if (!newUser) {
			res.status(400);
			throw new Error("Invalid user data");
		}

		res.status(201).json({
			_id: newUser._id,
			name: newUser.name,
			email: newUser.email,
			isAdmin: newUser.isAdmin,
			createdAt: newUser.createdAt,
		});
	})
);

//profile route
router.get(
	"/profile",
	userAuth,
	AsyncHandler(async (req, res) => {
		const { _id } = req.user;
		const findUser = await User.findById(_id);
		if (!findUser) {
			res.status(404);
			throw new Error("User not found");
		}
		res.json({
			_id: findUser._id,
			name: findUser.name,
			email: findUser.email,
			isAdmin: findUser.isAdmin,
			createdAt: findUser.createdAt,
		});
	})
);

//profile update route
router.put(
	"/profile",
	userAuth,
	AsyncHandler(async (req, res) => {
		const { name, email, password } = req.body;
		const findUser = await User.findById(req.user.id);
		if (!findUser) {
			res.status(404);
			throw new Error("User not found");
		}
		findUser.name = name || findUser.name;
		findUser.email = email || findUser.email;

		if (password) findUser.password = password;
		const updatedUser = await findUser.save();

		res.json({
			_id: updatedUser._id,
			name: updatedUser.name,
			email: updatedUser.email,
			isAdmin: updatedUser.isAdmin,
			createdAt: updatedUser.createdAt,
			token: generateToken(updatedUser._id),
		});
	})
);

export default router;
