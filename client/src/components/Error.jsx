import React from "react";
import { useNavigate } from "react-router-dom";

const Error = () => {
	const urlparams = new URLSearchParams(window.location.search);
	const message = urlparams.get("message");
	const navigate = useNavigate();

	return (
		// <div className="pt-32 flex flex-col items-center justify-center md:pt-40">
		// 	<div className="font-bold text-3xl">Payment status: {message}</div>
		// 	<button
		// 		onClick={() => {
		// 			navigate("/");
		// 		}}
		// 		className="mt-10 px-7 py-3 border rounded-full bg-blue-500 text-white font-bold cursor-pointer shadow-xl"
		// 	>
		// 		Home
		// 	</button>
		// </div>

		<div className="flex flex-1 justify-center items-center">
			<div className="flex flex-col text-center">
				<div className="font-bold text-3xl">
					Payment status: {message}
				</div>

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

export default Error;
