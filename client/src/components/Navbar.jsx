import { useContext, useEffect } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
// import { AppContext } from "../context/AppContext";

const Navbar = () => {
	const navigate = useNavigate();

	const { openSignIn } = useClerk();
	const { isSignedIn, user } = useUser();

	return (
		<div className="flex items-center justify-between mx-4 py-3 lg:mx-44">
			{/* left logo */}
			<img
				onClick={() => navigate("/")}
				className="w-32 sm:w-44"
				src={assets.logo}
			/>

			{/* right button */}
			{isSignedIn ? (
				<div className="flex items-center gap-2 sm:gap-3">
					<button className="flex items-center gap-2 bg-blue-100 px-4 sm:px-7 py-1.5 sm:py-2.5 rounded-full hover:scale-105">
						<img className="w-5" src={assets.credit_icon} />
						<p className="text-sm text-gray-600">Credits</p>
					</button>

					<p className="text-gray-600 max-sm:hidden">
						Hi, {user.fullName}
					</p>
					<UserButton />
				</div>
			) : (
				<button
					className="flex items-center gap-2 sm:gap-4 bg-black text-sm sm:text-lg text-white px-2 lg:px-6 py-2 lg:py-3 rounded-full"
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
