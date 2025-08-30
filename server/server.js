import "dotenv/config";
import express from "express";
import cors from "cors";
import connectDB from "./configs/mongodb.js";
import userRouter from "./routes/userRoutes.js";
import imageRouter from "./routes/imagesRoutes.js";
import bkashRouter from "./routes/bkashRoutes.js";

const PORT = process.env.PORT;
const app = express();

await connectDB();

app.use(express.json());
app.use(
	cors({
		methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
		origin: "*",
	})
);

app.get("/", (req, res) => res.send("API working."));
app.use("/api/user", userRouter);
app.use("/api/image", imageRouter);
app.use("/api/bkash", bkashRouter);

app.listen(PORT, () => console.log("Server running on port: ", PORT));
