import axios from "axios";
// import paymentModel from "../model/paymentModel.js";
import globals from "node-global-storage";
import { v4 as uuidv4 } from "uuid";
import mongoose from "mongoose";
import userModel from "../models/userModel.js";

export const payment_create = async (req, res) => {
	// console.log("inside paymentController.js -> req is: ", req);
	// THE `req` OBJECT:
	// {
	// ...
	// ...
	// ...
	//   body: { planId: 'Basic' },
	//   ...
	//   ...
	//   user: {
	//     _id: new ObjectId('68add08b0101a7a7027b32ee'),
	//     clerkId: 'user_31pWdEcWz5uop6sAXqViX9RAnGY',
	//     email: 'shahir.sizan18@gmail.com',
	//     photo: 'https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18zMXBXZEYxOU1RZHA2UW5GU3I3NjRHZm4zd24ifQ',
	//     firstName: 'Shahir Adil',
	//     creditBalance: 2,
	//     __v: 0
	//   },
	//	...
	//   bkash: {
	//     id_token: 'eyJraWQiOiJvTVJzNU9ZY0wrUnRXQ2o3ZEJtdlc5VDBEcytrckw5M1NzY0VqUzlERXVzPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJlODNlMDkwMC1jY2ZmLTQzYTctODhiNy0wNjE5NDJkMTVmOTYiLCJhdWQiOiI2cDdhcWVzZmljZTAxazltNWdxZTJhMGlhaCIsImV2ZW50X2lkIjoiMGFkZGU5YWUtMGJjMC00MGVjLThlMGUtMzZlMzMzYWM4MGMzIiwidG9rZW5fdXNlIjoiaWQiLCJhdXRoX3RpbWUiOjE3NTYzNjIzMzUsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC5hcC1zb3V0aGVhc3QtMS5hbWF6b25hd3MuY29tXC9hcC1zb3V0aGVhc3QtMV9yYTNuUFkzSlMiLCJjb2duaXRvOnVzZXJuYW1lIjoic2FuZGJveFRva2VuaXplZFVzZXIwMiIsImV4cCI6MTc1NjM2NTkzNSwiaWF0IjoxNzU2MzYyMzM1fQ.oVDbmCjMCW71ZbDkulLEurEcDvysK-exHE9wv3FvQuKAh2POlz-vvBqphiULTIrt3isCgib7GVNTe6HO9ofiy_ukeh2_CX_bxl3br_eSfopYcCdoZQ_y2w3xMEM_v6OZoDwmJPyPhrSi1wJTQgS8Ia65pu43lQj6J45CbWPKzR-kwAMQMuGe5y-ZSlfWIKWVtMqNcwGNEYncSXpnhOlN4hhP_srikHwq65Vw6TP_HhKnN54hOR5UZLobQnwmpIEJRqd8hNXRaCt_mP37cRAfhTeyts7eQKG2__-zXR4pXeFETmELLmbmKBx5zhkRQpc5lVHuO2QxYsVS8kDul9Y26w',
	//     refresh_token: 'eyJjdHkiOiJKV1QiLCJlbmMiOiJBMjU2R0NNIiwiYWxnIjoiUlNBLU9BRVAifQ.i9HW3E1bp_t_9AL3-4zPYZFXrTJO4dklWZ4jBzMxNzqGXq2tZBFTs5JoilpBPlk3nzgRRC1_JyLT3zyeiVkyaBZ54oldEh-Vxg45jbi78B8wbL9wofczNn5h9ivkIl5YD0e1-S1p0Rp6PfNmEefNlrBmffjGxlWWhritOjZFZk8mFP_G5CBQHLr8ec-ADAiXAA43fwQo_yD2l12BsSzZ-fpmOJPQ9NjEHbis6OWU0jBGi9GrRqqiFOJEHmPs3rnZuVEPfmAtPXke3Q6n4atJBC5oz4aPwlfs348M-7__to6Y-qeAQ85pUTkI8slvdcxL4MrRB5BGEiYMci7NylMOyA.65xfnG4H2bQjAH20.k5eXEruFNkqF6bSvrf-nbhYeK9eNFlrs9Hs7Oiisfir30fQ3C2iJmspGjhDI3m4u5F_F_oMlxGq158T4dv5SWmfcx4WtJ89exMMnRqU8kT0LoonpLdwmPqbstHTvi6FSKt57vIf9Ymtz5lorYybxjnV-MCL2jw0EalAG7SmY0GVqsctNl76ceBsR7uEzhIENrhD_ytJNaIkSLyjJ07ZI_AG2kag3ryu9obSCJylRjZRudhcQJAIOQgbLG-meE0ZP_i56OmFfkngEJpt-LGosRRXfMs-jVm0hFKS4lZA_TLNm-orav2-2la4se5hzPKEJw_3A4MQ2t2uGJ0N-HBtd82MkbYq171M9-4beKOSAfzBumz-BzLlyFECejgtHzprb3OYAT0BXC-ujf9_u1yTubd4hrE9qOnCY6p_BVnxZGpAZA2YQ3rfl5FZh80i4HMF_H5kDhWLxB04kZ7jvmkm5Nh2xW8rYZ2CT9ZBdbztKxpRVyIYdFT9i66QtHaue4KPtJK50oEF8g9GuZYy3AycoD7BzICBmpcNJ5d6ogOdCAJEteuAcHTPKYKNaNYtHBON6OIQm-LqaXQkQiQ6x1kvhJWw2AN_NCNyGDOQj8y1bN7EAtTFD0l5ufXAhueFNARqK-5qzqEA7RjhGY6v98DagDMKcHqfLMqE67kNR_-pLWlJwYumReNaIpjq1VUPfsiifvw7gJM6DJzMkeYTx0mIRsPa-MyJcDH_Gte8Ev_QF92NLi_XAfjPy-XL_ShRynczVo_-_721TG65xCmf9J6wb0Ugm8c__3TpPQY0BMOBT0ERjLjUfzSwPjAU-QLvFYLdUmJz8ehLOeBk_FN8uW98A_znbcz9GiSKRA2GUzzPl3MSNkp1U19FnUMBaI6aADlhlnB24O7lxegsFTxae9Y-Zm3CR5KhERqGfDMtVVTTToDHcVl7IGgPZnbmS_Z3vdsqU0gnA5W2VjyQ2Xhwp6MboTd9FEbsWS0sN3UEvgoc1z2SdlekdjRMVNaGdkcLOnECJZmdN94OaftLPXnayoR5F497kr-m-mWgwZqBW2TF_ghIl7qj76CKW0ZsjSqIgaKl__2psXyEd-1AAJckGwjsyO-qlzpDInIAyCJPfCPS0QeGfwQFBxko8z1EfBNWaxWnbe9vMfTmBA_5qmOJgpBJ7BoycaoKN3taI_hSTItfNhCQTSgFJhywL38oKS8EnsEyaCN12EIcowUqioPs45Zdm34s9QPPBf9hZUfuIC_A1TaRQhIurpx9kqRtez4Agu4UJP69ly1-29yb009tF2tBx4bLK6TAax793rlTWFAy045Rd5aJAnB4.cQKNP4wytZ2kvXAmYCG2Ug'
	//   }
	// ...
	// ...
	// ...
	// }

	const { planId } = req.body;
	const { clerkId } = req.user;
	const { id_token } = req.bkash;

	let plan, credits, amount;
	switch (planId) {
		case "Basic":
			plan = "Basic";
			credits = 100;
			amount = 10;
			break;
		case "Advanced":
			plan = "Basic";
			credits = 500;
			amount = 50;
			break;
		case "Business":
			plan = "Basic";
			credits = 5000;
			amount = 250;
			break;

		default:
			break;
	}

	/** Returns the number of milliseconds elapsed since midnight, January 1, 1970 Universal Coordinated Time (UTC). */
	date = Date.now();

	const transactionData = {
		clerkId,
		plan,
		credits,
		amount,
		date,
	};

	try {
		const { data } = await axios.post(
			process.env.bkash_create_payment_url,
			{
				mode: "0011",
				payerReference: " ",
				// bkash UI theke cancel/confirm korle ei link e navigate korbe.
				// Mane bkash server amar server ke kon url e call korbe
				callbackURL: `${process.env.BACKEND_BASE_URL}/api/bkash/payment/callback`,
				amount: amount,
				currency: "BDT",
				intent: "sale",
				merchantInvoiceNumber: "Inv" + uuidv4().substring(0, 6),
			},
			{
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
					Authorization: id_token,
					"X-App-Key": "4f6o0cjiki2rfm34kfdadl1eqq",
				},
			}
		);
		// console.log(data);
		//   data = {
		//   paymentID: 'TR0011GEbQcp11749482802858',
		//   bkashURL: 'https://sandbox.payment.bkash.com/?paymentId=TR0011GEbQcp11749482802858&hash=M4wj!h2dAvqDScpymCZoFNic1Rp(ZGhmUs2Ll-PGBTA6Y3DjwqW.Ai2UVqsXDZE7R8vKTNqtS!Bk*jJh)eaQ8FF(IsuXSHVrQz-.1749482802858&mode=0011&apiVersion=v1.2.0-beta/',
		//   callbackURL: 'http://localhost:5000/bkash/payment/callback',
		//   successCallbackURL: 'http://localhost:5000/bkash/payment/callback?paymentID=TR0011GEbQcp11749482802858&status=success&signature=WL3lwYQlWP',
		//   failureCallbackURL: 'http://localhost:5000/bkash/payment/callback?paymentID=TR0011GEbQcp11749482802858&status=failure&signature=WL3lwYQlWP',
		//   cancelledCallbackURL: 'http://localhost:5000/bkash/payment/callback?paymentID=TR0011GEbQcp11749482802858&status=cancel&signature=WL3lwYQlWP',
		//   amount: '480',
		//   intent: 'sale',
		//   currency: 'BDT',
		//   paymentCreateTime: '2025-06-09T21:26:42:858 GMT+0600',
		//   transactionStatus: 'Initiated',
		//   merchantInvoiceNumber: 'Inva633b5',
		//   statusCode: '0000',
		//   statusMessage: 'Successful'
		// }

		return res.status(200).json({ bkashURL: data.bkashURL });
	} catch (error) {
		return res.status(401).json({ error: error.message });
	}
};
