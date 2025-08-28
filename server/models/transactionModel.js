import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
	date: { type: Number },
	clerkId: { type: String, required: true },
	plan: { type: String, required: true },
	amount: { type: Number, required: true },
	credits: { type: Number, required: true },
	payment: { type: Boolean, default: false },
});

const transactionModel = mongoose.model("transaction", transactionSchema);

export default transactionModel;
