import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Success = () => {
	const navigate = useNavigate();

	const [message, setMessage] = useState("");
	const [amount, setAmount] = useState("");
	const [creditsBought, setCreditsBought] = useState("");
	const [creditsNow, setCreditsNow] = useState("");

	useEffect(() => {
		const params = new URLSearchParams(window.location.search);

		setMessage(params.get("message"));
		setAmount(params.get("amount"));
		setCreditsBought(params.get("creditsBought"));
		setCreditsNow(params.get("creditsNow"));
	}, []); // The empty dependency array ensures this effect runs only once when the component mounts.

	return (
		<div className="flex flex-1 justify-center items-center">
			<div className="flex flex-col text-center">
				<p className="text-5xl font-bold text-green-700">
					Congratulations!
				</p>

				<p className="mt-5 text-2xl ">
					You bought{" "}
					<span className="font-bold">{creditsBought} credits</span>{" "}
					for <span className="font-bold"> ৳{amount}</span>
				</p>
				<p className="text-2xl ">
					Your current credit balance:{" "}
					<span className="font-bold"> {creditsNow} credits</span>
				</p>

				<button
					onClick={() => {
						navigate("/");
					}}
					className="mt-10 px-7 py-3 border rounded-full bg-blue-500 text-white font-bold cursor-pointer shadow-xl"
				>
					Home
				</button>
			</div>
		</div>
	);
};

export default Success;
