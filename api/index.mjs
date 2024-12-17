import "dotenv/config";
import express from "express";
import mongoose from "mongoose";

const PORT = process.env.PORT || 3000;
const app = express();

mongoose
	.connect(process.env.DB_URL)
	.then(() => {
		console.log("DB is connected");
	})
	.catch((err) => {
		console.log(err);
	});

app.get("/", (req, res) => {
	res.send("Hello There!");
});

app.listen(PORT, () => console.log(`Server is running on PORT: ${PORT}`));

//srjalawadi07
//0fnwTGjm0l0UKgGb
