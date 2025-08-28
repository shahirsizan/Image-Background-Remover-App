import express from "express";
import authUser from "../middlewares/auth.js";
import { call_back, payment_create } from "../controllers/paymentController.js";
import { bkash_auth } from "../middlewares/bkashMiddleware.js";

const bkashRouter = express.Router();

// request from frontend is:
// const { data } = await axios.post(
//     `https://image-background-remover-app-gs-aug2025-l4f003gcy.vercel.app/api/bkash/payment/create`,
//     {
//         planId: planId,
//     },
//     { headers: { token: token } }
// );

bkashRouter.post("/payment/create", bkash_auth, payment_create);
bkashRouter.get("/payment/callback", bkash_auth, call_back);

export default bkashRouter;
