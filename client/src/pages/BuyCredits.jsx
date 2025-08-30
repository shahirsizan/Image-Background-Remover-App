import { assets, plans } from "../assets/assets";
import { useAuth } from "@clerk/clerk-react";
import axios from "axios";

const BuyCredits = () => {
	const { getToken } = useAuth();

	const pay = async (e, planId) => {
		try {
			const token = await getToken();
			// console.log("token in BuyCredits.jsx: ", token);

			// "https://image-background-remover-app-gs-aug.vercel.app/api/bkash/payment/create" dite hobe niche
			const { data } = await axios.post(
				`${import.meta.env.VITE_BACKEND_URI}/api/bkash/payment/create`,
				// "http://localhost:4000/api/bkash/payment/create",
				{
					planId: planId,
				},
				{ headers: { token: token } }
			);

			// redirect the user to bkash UI
			window.location.href = data.bkashURL;
		} catch (error) {
			console.log("Error: BuyCredits.jsx -> pay(): ", error);
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
							className="flex items-center justify-center w-full md:gap-2 bg-white text-gray-800 mt-8 text-md border rounded-md py-3 min-w-35 cursor-pointer hover:scale-105 transition-all"
							onClick={(e) => {
								pay(e, item.id);
							}}
						>
							<img
								src="https://freepnglogo.com/images/all_img/1701541855%E0%A6%AC%E0%A6%BF%E0%A6%95%E0%A6%BE%E0%A6%B6-%E0%A6%B2%E0%A6%97%E0%A7%8B.png"
								className="w-[55px] md:w-[70px]"
							/>
							<span className="text-sm md:text-xl">Pay</span>
						</button>
					</div>
				))}
			</div>
		</div>
	);
};

export default BuyCredits;
