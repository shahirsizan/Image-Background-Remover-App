import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";

const Result = () => {
	const { resultImage, image } = useContext(AppContext);

	return (
		<div className="mx-4 lg:mx-44 my-3 mt-14 min-h-[75vh]">
			<div className="bg-white rounded-xl px-8 py-6 drop-shadow-sm">
				{/* image container */}
				<div className="flex flex-col sm:grid sm:grid-cols-[1fr_1fr] gap-8">
					{/* left - Original */}
					<div>
						<p className="mb-2">Original image</p>
						<img
							src={image ? URL.createObjectURL(image) : ""}
							className="rounded-md w-full"
						/>
					</div>

					{/* right - Converted */}
					{/* <div className="flex flex-col"> */}
					<div>
						<p className="mb-2">Background removed</p>
						<div className="relative rounded-md  bg-layer overflow-hidden">
							<img src={resultImage ? resultImage : ""} />

							{!resultImage && image && (
								<div className="absolute right-1/2 bottom-1/2 transform translate-x-1/2 translate-y-1/2">
									<div className="border-4 border-violet-600 rounded-full h-12 w-12 border-t-transparent animate-spin"></div>
								</div>
							)}
						</div>
					</div>
				</div>

				{/* button container */}
				{resultImage && (
					<div className="flex justify-center sm:justify-end items-center flex-wrap gap-4 mt-6">
						<button className="px-8 py-2.5 text-violet-600 text-sm border border-violet-600 rounded-full hover:scale-105">
							Try another image
						</button>
						<a
							className="px-8 py-2.5 text-white text-sm bg-gradient-to-r from-violet-600 to-fuchsia-500 rounded-full hover:scale-105"
							href={resultImage}
							download
						>
							Download image
						</a>
					</div>
				)}
			</div>
		</div>
	);
};

export default Result;
