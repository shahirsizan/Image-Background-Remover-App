import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { useEffect } from "react";

const Navbar = () => {
	const { credit, isLoading, loadCreditsData } = useContext(AppContext);
	const navigate = useNavigate();

	const { openSignIn } = useClerk();
	const { isSignedIn, user } = useUser();

	useEffect(() => {
		if (isSignedIn) {
			loadCreditsData();
		}
	}, [isSignedIn]);

	return (
		<div className="NAVBAR sticky top-0 z-50 bg-white/80 backdrop-blur-sm shadow-sm flex items-center justify-between px-[5vw] md:px-[8vw] lg:px-[12vw] py-2">
			{/* left logo */}
			<img
				onClick={() => navigate("/")}
				className="w-32 sm:w-44"
				src={assets.logo}
			/>

			{/* right button */}
			{isSignedIn ? (
				<div className="flex items-center gap-2 sm:gap-3">
					{isLoading ? (
						<div className="font-bold">Loading...</div>
					) : (
						<button
							onClick={() => {
								navigate("/buy");
							}}
							className="flex items-center gap-2 bg-blue-100 px-4 sm:px-7 py-1.5 sm:py-2.5 rounded-full hover:scale-105 cursor-pointer transition-all"
						>
							<img className="w-5" src={assets.credit_icon} />
							<p className="text-xs sm:text-sm font-medium text-gray-600">
								Credits: {credit}
							</p>
						</button>
					)}

					<p className="text-gray-600 max-sm:hidden">
						Hi, {user.fullName}
					</p>

					<UserButton />
				</div>
			) : (
				<button
					className="flex items-center gap-2 sm:gap-4 bg-black text-sm sm:text-lg text-white px-2 lg:px-6 py-2 lg:py-3 rounded-full hover:scale-105 transition-all cursor-pointer"
					onClick={() => {
						openSignIn({ forceRedirectUrl: "/" });
					}}
				>
					Get started{" "}
					<img className="w-3 sm:w-4" src={assets.arrow_icon} />
				</button>
			)}
		</div>
	);
};

export default Navbar;
