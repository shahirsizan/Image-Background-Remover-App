import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import userModel from "../models/userModel.js";
import transactionModel from "../models/transactionModel.js";

export const payment_create = async (req, res) => {
	// console.log("inside paymentController.js -> req.user is: ", req.user);
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
	// clerkId = req.user.clerkId;
	const { id_token } = req.bkash;

	let plan, credits, amount;
	switch (planId) {
		case "Basic":
			plan = "Basic";
			credits = 1;
			amount = 10;
			break;
		case "Advanced":
			plan = "Basic";
			credits = 2;
			amount = 20;
			break;
		case "Business":
			plan = "Basic";
			credits = 3;
			amount = 30;
			break;
		default:
			break;
	}
	/** Returns the number of milliseconds elapsed since January 1, 1970 */
	const date = Date.now();

	try {
		const { data } = await axios.post(
			process.env.bkash_create_payment_url,
			{
				mode: "0011",
				payerReference: " ",
				// bkash UI theke cancel/confirm korle ei link e navigate korbe.
				// Mane bkash server amar server ke kon url e call korbe

				// callbackURL: `https://image-background-remover-app-gs-aug.vercel.app/api/bkash/payment/callback`,
				// hobe niche
				// callbackURL: `http://image-background-remover-app-gs-aug.vercel.app/api/bkash/payment/callback`,
				callbackURL: `http://localhost:4000/api/bkash/payment/callback`,
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
					"X-App-Key": process.env.bkash_api_key,
				},
			}
		);

		// console.log(data);
		//   data = {
		//   paymentID: 'TR0011eq4dc4w1756379944796',
		//   bkashURL: 'https://sandbox.payment.bkash.com/?paymentId=TR0011eq4dc4w1756379944796&hash=m*)*HJbzj8931BEgNmqFrv4IMTXbH.aAS4ah.4wCAd2KeP1Gds1.NjhLQXz((Ploqb!aTzwi8*0!3ZlE9I!HHGkeDL7R)yJU.xJB1756379944797&mode=0011&apiVersion=v1.2.0-beta/',
		//   callbackURL: 'http://localhost:4000/api/bkash/payment/callback',
		//   successCallbackURL: 'http://localhost:4000/api/bkash/payment/callback?paymentID=TR0011eq4dc4w1756379944796&status=success&signature=D6qnEjXrWp',
		//   failureCallbackURL: 'http://localhost:4000/api/bkash/payment/callback?paymentID=TR0011eq4dc4w1756379944796&status=failure&signature=D6qnEjXrWp',
		//   cancelledCallbackURL: 'http://localhost:4000/api/bkash/payment/callback?paymentID=TR0011eq4dc4w1756379944796&status=cancel&signature=D6qnEjXrWp',
		//   amount: '10',
		//   intent: 'sale',
		//   currency: 'BDT',
		//   paymentCreateTime: '2025-08-28T17:19:04:796 GMT+0600',
		//   transactionStatus: 'Initiated',
		//   merchantInvoiceNumber: 'Inv22e0f6',
		//   statusCode: '0000',
		//   statusMessage: 'Successful'
		// }

		const transactionData = {
			date: date,
			paymentId: data.paymentID,
			clerkId: req.user.clerkId,
			plan: plan,
			amount: data.amount,
			credits: credits,
		};

		// console.log("transactionData: ", transactionData);

		const newTransaction = await transactionModel.create(transactionData);
		// console.log("newTransaction in db: ", newTransaction);

		return res.status(200).json({ bkashURL: data.bkashURL });
		// response back the `bkashURL` to frontend so
		// user can be redirected to bkash UI.
		// note: upore `callbackURL` hocche bkash UI er kaj sheshe
		// bkash user ke jekhane redirected korbe setar URL.
	} catch (error) {
		return res.status(401).json({ error: error.message });
	}
};

export const call_back = async (req, res) => {
	// after successful payment
	// `http://localhost:4000/api/bkash/payment/callback?paymentID=TR00117RbXHg81756392147281&status=success&signature=OUqqZdgmIl&apiVersion=1.2.0-beta/`
	// will get called. Retrieve the url params
	const { paymentID, status } = req.query;

	// if status not-success, redirect to error page
	if (status === "cancel" || status === "failure") {
		// niche process.env.FRONTEND_URI dite hobe. Make sure .env file update korechi
		return res.redirect(
			// `${process.env.FRONTEND_URI}/error?message=${status}`
			`http://localhost:5173/error?message=${status}`
		);
	}

	// if status success, call executePayment API
	if (status === "success") {
		try {
			const id_token = req.bkash.id_token;

			const { data } = await axios.post(
				process.env.bkash_execute_payment_url,
				{
					paymentID: paymentID,
				},
				{
					headers: {
						Accept: "application/json",
						Authorization: id_token,
						"X-App-Key": process.env.bkash_api_key,
					},
				}
			);

			console.log(
				"Data after calling `bkash_execute_payment_url`: ",
				data
			);

			// `Data after calling `bkash_execute_payment_url`:
			// console.log("Data after payment-execution: ", data);
			// 			{
			//   paymentID: 'TR0011umOKR5N1756397920069',
			//   trxID: 'CHS70NBSE1',
			//   transactionStatus: 'Completed',
			//   amount: '30',
			//   currency: 'BDT',
			//   intent: 'sale',
			//   paymentExecuteTime: '2025-08-28T22:18:55:592 GMT+0600',
			//   merchantInvoiceNumber: 'Inv8c8e60',
			//   payerType: 'Customer',
			//   payerReference: ' ',
			//   customerMsisdn: '01929918378',
			//   payerAccount: '01929918378',
			//   maxRefundableAmount: '30',
			//   statusCode: '0000',
			//   statusMessage: 'Successful'
			// }

			if (data.statusMessage === "Successful") {
				// payment complete

				// fetch the transaction document from db (created in payment_create())
				const transactionDataInDB = await transactionModel.findOne({
					paymentId: data.paymentID,
				});
				// console.log("transactionDataInDB: ", transactionDataInDB);
				// 	{
				//     _id: new ObjectId('68b0829ca91fdd97d8e9b735'),
				//     date: 1756398236016,
				//     paymentId: 'TR00113pUlYLu1756398236179',
				//     clerkId: 'user_31pWdEcWz5uop6sAXqViX9RAnGY',
				//     plan: 'Basic',
				//     amount: 10,
				//     credits: 2,
				//     payment: false,
				//     __v: 0
				//   }

				// Time to add credit points to user-document to be shown in Navbar
				const userData = await userModel.findOne({
					clerkId: transactionDataInDB.clerkId,
				});
				// console.log("userData: ", userData);

				const updatedUserDataInDB = await userModel.findOneAndUpdate(
					{ clerkId: userData.clerkId },
					{
						$inc: {
							creditBalance: transactionDataInDB.credits,
						},
					},
					{ new: true }
				);
				console.log("updatedUserDataInDB: ", updatedUserDataInDB);

				// Now make the payment status `true`
				await transactionModel.updateOne(
					{
						paymentId: transactionDataInDB.paymentId,
					},
					{ payment: true }
				);

				return res.redirect(
					// `${process.env.FRONTEND_URI}/success?message=${data.statusMessage}&amount=${data.amount}&creditsBought=${transactionDataInDB.credits}&creditsNow=${updatedUserDataInDB.creditBalance}`
					`http://localhost:5173/success?message=${data.statusMessage}&amount=${data.amount}&creditsBought=${transactionDataInDB.credits}&creditsNow=${updatedUserDataInDB.creditBalance}`
				);
			} else {
				return res.redirect(
					// `${process.env.FRONTEND_URI}/error?message=${data.statusMessage}`
					`http://localhost:5173/error?message=${data.statusMessage}`
				);
			}
		} catch (error) {
			return res.redirect(
				// `${process.env.FRONTEND_URI}/error?message=${error.message}`
				`http://localhost:5173/error?message=${error.message}`
			);
		}
	}
};
