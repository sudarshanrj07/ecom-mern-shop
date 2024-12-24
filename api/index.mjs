import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import router from "./routes/router.mjs";
import cors from "cors";

const app = express();

mongoose
	.connect(process.env.DB_URL)
	.then(() => console.log("DB is connected"))
	.catch((err) => console.log(`Error: ${err}`));

app.use(express.json());
app.use(cors());

app.use(router);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server is running on PORT: ${PORT}`));

app.get("/", (req, res) => {
	res.send("Hello There!");
});
