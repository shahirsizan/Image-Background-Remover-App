import { useContext, useEffect } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
// import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
// import { AppContext } from "../context/AppContext";

const Navbar = () => {
	const navigate = useNavigate();

	return (
		<div className="flex items-center justify-between mx-4 py-3 lg:mx-44">
			{/* left logo */}
			<img
				onClick={() => navigate("/")}
				className="w-32 sm:w-44"
				src={assets.logo}
			/>

			<button className="flex items-center gap-2 sm:gap-4 bg-black text-sm sm:text-lg text-white px-2 lg:px-6 py-2 lg:py-3 rounded-full">
				Get started{" "}
				<img className="w-3 sm:w-4" src={assets.arrow_icon} />
			</button>
		</div>
	);
};

export default Navbar;
