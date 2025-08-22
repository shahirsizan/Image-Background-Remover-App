import { useState } from "react";
import { assets } from "../assets/assets";

const BgSlider = () => {
	const [sliderPosition, setSliderPosition] = useState(50);

	return (
		<div className="pb-10 md:py-20 px-4 lg:px-44">
			{/* title */}
			<h1 className="mb-10 text-4xl lg:text-5xl xl:text-6xl font-bold text-center">
				<span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500">
					Background
				</span>{" "}
				removal demo
			</h1>

			{/* slider */}
			<div className="relative w-full max-w-3xl overflow-hidden m-auto rounded-xl">
				{/* image with bg */}
				<img
					src={assets.image_w_bg}
					style={{
						clipPath: `inset(0 ${100.2 - sliderPosition}% 0 0)`,
					}}
				/>

				{/* image without bg */}
				<img
					src={assets.image_wo_bg}
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
