import React from "react";
import { useNavigate } from "react-router-dom";

const Error = () => {
	const urlparams = new URLSearchParams(window.location.search);
	const message = urlparams.get("message");
	const messageFromMe = urlparams.get("messageFromMe");
	const navigate = useNavigate();

	return (
		<div className="flex flex-1 justify-center items-center">
			<div className="flex flex-col text-center">
				<div className="flex flex-col font-bold text-3xl">
					<p>Payment status: {message}</p>
					<p>message from me: {messageFromMe}</p>
				</div>

				<button
					onClick={() => {
						navigate("/");
					}}
					className="max-w-20 mt-10 px-7 py-3 border rounded-full bg-blue-500 text-white font-bold cursor-pointer shadow-xl"
				>
					Home
				</button>
			</div>
		</div>
	);
};

export default Error;
