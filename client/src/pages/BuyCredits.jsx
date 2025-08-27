import { assets, plans } from "../assets/assets";
import { useAuth } from "@clerk/clerk-react";
import axios from "axios";

const BuyCredits = () => {
	const { getToken } = useAuth();

	const pay = async (e, planId) => {
		try {
			const token = await getToken();
			console.log("token in BuyCredits.jsx: ", token);

			const x = await axios.post(
				"https://image-background-remover-app-gs-aug.vercel.app/api/bkash/payment/create",
				{
					planId: planId,
				},
				{ headers: { token: token } }
			);
			console.log("x: ", x);
		} catch (error) {
			console.log("BuyCredits.jsx -> pay() error: ", error);
		}
	};

	return (
		<div className="min-h-[75vh] text-center pt-14 mb-10 lg:px-44">
			<div className="flex justify-center items-center">
				<span className="border border-gray-400 rounded-full px-4 sm:px-6 py-2 mb-6">
					Our plans
				</span>
			</div>

			<h1 className="text-center text-2xl lg:text-4xl font-semibold mb-6 sm:mb-10">
				Choose a plan
			</h1>

			<div className="flex flex-wrap justify-center gap-5">
				{plans.map((item, index) => (
					<div
						key={index}
						className="bg-white drop-shadow-lg rounded-lg px-7 py-5 text-left"
					>
						<img src={assets.logo_icon} width={50} />
						<p className="mt-3 font-semibold">{item.id}</p>
						<p className="text-sm">{item.desc}</p>
						<p className="mt-6">
							<span>৳{item.price}</span> / {item.credits} credits
						</p>
						<button
							className="w-full bg-gray-800 text-white mt-8 text-sm border rounded-md py-3 min-w-35"
							onClick={(e) => {
								pay(e, item.id);
							}}
						>
							Purchase
						</button>
					</div>
				))}
			</div>
		</div>
	);
};

export default BuyCredits;
