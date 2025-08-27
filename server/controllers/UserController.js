import { Webhook } from "svix";
import userModel from "../models/userModel.js";

// API to sync Clerk User with mongo database
// at http://localhost:4000/api/user/webhooks
const clerkWebhooks = async (req, res) => {
	try {
		// Create an svix instance with clerk webhook secret.
		const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

		await whook.verify(JSON.stringify(req.body), {
			"svix-id": req.headers["svix-id"],
			"svix-timestamp": req.headers["svix-timestamp"],
			"svix-signature": req.headers["svix-signature"],
		});

		const { data, type } = req.body;

		switch (type) {
			case "user.created": {
				const userData = {
					clerkId: data.id,
					email: data.email_addresses[0].email_address,
					firstName: data.first_name,
					lastname: data.last_name,
					photo: data.image_url,
				};
				await userModel.create(userData);
				res.json({});
				break;
			}
			case "user.updated": {
				const userData = {
					email: data.email_addresses[0].email_address,
					firstName: data.first_name,
					lastname: data.last_name,
					photo: data.image_url,
				};

				await userModel.findOneAndUpdate(
					{ clerkId: data.id },
					{
						...userData,
					}
				);

				res.json({});
				break;
			}
			case "user.deleted": {
				await userModel.findOneAndDelete({ clerkId: data.id });
				res.json({});
				break;
			}
			default:
				break;
		}
	} catch (error) {
		console.log("webhook error : ", error.message);
		res.json({ success: false, message: error.message });
	}
};

// API to get user available credits
const userCredits = async (req, res) => {
	// console.log("ami UserController->userCredits e 1");

	try {
		const { clerkId } = req.headers;
		const userData = await userModel.findOne({ clerkId: clerkId });
		// console.log("userData :>> ", userData);
		res.json({ success: true, userCredits: userData.creditBalance });
	} catch (error) {
		console.log("error :>> ", error.message);
		res.json({ success: false, message: error.message });
	}
};

// API to make payment for credits (copied from video tutorial repo)
// const paymentBkashpay = async (req, res) => {
// 	try {
// 		const { clerkId } = req.headers;
// 		const { planId } = req.body;

// 		const userData = await userModel.findOne({ clerkId: clerkId });

// 		if (!userData || !planId) {
// 			return res.json({ success: false, message: "Invalid Credentials" });
// 		}

// 		let credits, plan, amount, database;
// 		switch (planId) {
// 			case "Basic":
// 				plan = "Basic";
// 				credits = 100;
// 				amount = 10;
// 				break;
// 			case "Advanced":
// 				plan = "Basic";
// 				credits = 500;
// 				amount = 50;
// 				break;
// 			case "Business":
// 				plan = "Basic";
// 				credits = 5000;
// 				amount = 250;
// 				break;

// 			default:
// 				break;
// 		}

// 		date = Date.now();

// 		const transactionData = {
// 			clerkId,
// 			plan,
// 			amount,
// 			credits,
// 			date,
// 		};

// 		const newTransaction = await transactionModel.create(transactionData);

// 		const options = {
// 			amount: amount * 100,
// 			currency: process.env.CURRENCY,
// 			receipt: newTransaction._id,
// 		};

// 		await razorpayInstance.orders.create(options, (error, order) => {
// 			if (error) {
// 				res.json({ success: false, message: error });
// 			}
// 			res.json({ success: true, order });
// 		});
// 	} catch (error) {
// 		console.log("error :>> ", error.message);
// 		res.json({ success: false, message: error.message });
// 	}
// };

export { clerkWebhooks, userCredits };
