import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
dotenv.config();
const port = process.env.PORT || 5000;

import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";
import routes from "./routes/routes.js";

connectDB();

const app = express();

import cors from "cors";

app.use(
	cors({
		origin: ["https://stack-sense.vercel.app"],
		methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
		credentials: true,
	})
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api", routes);

app.get("/", (req, res) => res.send("server is running!"));

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
