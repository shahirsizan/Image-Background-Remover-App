import React from "react";
import { assets } from "../assets/assets";

const Result = () => {
	return (
		<div className="mx-4 lg:mx-44 my-3 mt-14 min-h-[75vh]">
			<div className="bg-white rounded-xl px-8 py-6 drop-shadow-sm">
				{/* image container */}
				<div className="flex flex-col sm:grid sm:grid-cols-[1fr_1fr] gap-8">
					{/* left - Original */}
					<div>
						<p className="mb-2">Original image</p>
						<img
							src={assets.image_w_bg}
							className="rounded-md w-full"
						/>
					</div>

					{/* right - Converted */}
					{/* <div className="flex flex-col"> */}
					<div>
						<p className="mb-2">Background removed</p>
						<div className="relative rounded-md border border-gray-600 bg-layer overflow-hidden">
							<img
								src={assets.image_wo_bg}
								className="rounded-md w-full"
							/>
							{/* spinner */}
							<div className="absolute right-1/2 bottom-1/2 transform translate-x-1/2 translate-y-1/2">
								<div className="h-6 w-6 sm:h-12 sm:w-12 border-4 rounded-full border-violet-700 animate-ping "></div>
							</div>
						</div>
					</div>
				</div>

				{/* button container */}
				<div className="flex justify-center sm:justify-end items-center flex-wrap gap-4 mt-6">
					<button className="px-8 py-2.5 text-violet-600 text-sm border border-violet-600 rounded-full hover:scale-105">
						Try another image
					</button>
					<a
						className="px-8 py-2.5 text-white text-sm bg-gradient-to-r from-violet-600 to-fuchsia-500 rounded-full hover:scale-105"
						href=""
					>
						Download image
					</a>
				</div>
			</div>
		</div>
	);
};

export default Result;
