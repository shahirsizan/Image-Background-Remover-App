import express from "express";
import authUser from "../middlewares/auth";
import { payment_create } from "../controllers/paymentController";

const bkashRouter = express.Router();

// request from frontend is:
// const { data } = await axios.post(
//     `https://image-background-remover-app-gs-aug2025-l4f003gcy.vercel.app/api/bkash/payment/create`,
//     {
//         planId: planId,
//     },
//     { headers: { token: token } }
// );

bkashRouter.post("/payment/create", authUser, payment_create);

export default bkashRouter;
