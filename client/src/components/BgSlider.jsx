import { useState } from "react";
import { assets } from "../assets/assets";

const BgSlider = () => {
	const [sliderPosition, setSliderPosition] = useState(50);

	return (
		<div className=" py-12 xl:py-28">
			{/* title */}
			<h1 className="uppercase mb-10 text-4xl lg:text-5xl xl:text-6xl font-bold text-center">
				<span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500">
					Background
				</span>{" "}
				removal demo
			</h1>

			{/* slider */}
			<div className="relative border-2 max-sm:w-[200px] sm:w-[250px] md:w-[312px] overflow-hidden m-auto rounded-xl">
				{/* image with bg */}
				<img
					src={assets.withBG}
					style={{
						clipPath: `inset(0 ${100.2 - sliderPosition}% 0 0)`,
					}}
				/>

				{/* image without bg */}
				<img
					src={assets.withoutBG}
					className="absolute top-0 left-0"
					style={{
						clipPath: `inset(0 0 0 ${sliderPosition}%)`,
					}}
				/>

				{/* slider */}
				<input
					className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full z-10 slider"
					type="range"
					min={0}
					max={100}
					value={sliderPosition}
					onChange={(e) => {
						setSliderPosition(e.target.value);
					}}
				/>
			</div>
		</div>
	);
};

export default BgSlider;
