import axios from "axios";
// import paymentModel from "../model/paymentModel.js";
import globals from "node-global-storage";
import { v4 as uuidv4 } from "uuid";
import mongoose from "mongoose";
import userModel from "../models/userModel.js";

// after passing through auth.js and bkashMiddleware.js,
// request from frontend now looks like:
// const { data } = await axios.post(
//     `https://image-background-remover-app-gs-aug2025-l4f003gcy.vercel.app/api/bkash/payment/create`,
//     {
//         planId: planId,
//     },
//     user: user;
//     bkash:{
// 			id_token:id_token,
// 			refresh_token:refresh_token
//	   }
// );
// We'll use the req.headers.clerkId to get the users data

export const payment_create = async (req, res) => {
	console.log("inside paymentController.js -> req is: ", req);
};
