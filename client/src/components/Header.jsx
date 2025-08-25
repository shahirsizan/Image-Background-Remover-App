import { useContext } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";

const Header = () => {
	const { removeBg } = useContext(AppContext);

	return (
		<div className="flex max-sm:flex-col-reverse items-center justify-center gap-y-10 px-4 lg:px-44 mt-10 lg:mt-20">
			<div>
				<h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-center">
					Remove{" "}
					<span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500">
						background
					</span>{" "}
					from image
				</h1>

				<p className="my-6 text-gray-500 md:text-xl text-center">
					Upload an image and get a clean, transparent background in
					seconds
				</p>

				<div className="text-center sm:mb-16 sm:mt-14">
					<input
						onChange={(e) => {
							removeBg(e.target.files[0]);
						}}
						type="file"
						accept="image/*"
						id="upload1"
						hidden
					/>
					<label
						htmlFor="upload1"
						className="inline-flex items-center gap-3 px-8 py-4 rounded-full cursor-pointer bg-blue-500 transition-all hover:scale-105 "
					>
						<img src={assets.upload_btn_icon} alt="" />
						<p className="text-white text-sm md:text-lg">
							Upload your image
						</p>
					</label>
				</div>
			</div>
		</div>
	);
};

export default Header;
