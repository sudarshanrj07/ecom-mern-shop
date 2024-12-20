import { Router } from "express";
import AsyncHandler from "express-async-handler";
import { User } from "../models/User.mjs";

const userRouter = Router();

userRouter.post(
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
				token: null,
				createdAt: findUser.createdAt,
			});
		} else {
			res.status(401);
			throw new Error("Invalid credentials");
		}
	})
);

userRouter.post(
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

export default userRouter;
