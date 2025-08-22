import { assets } from "../assets/assets";

const Steps = () => {
	return (
		<div className="px-4 lg:px-44 py-20 xl:py-40">
			<h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-center">
				Steps to remove{" "}
				<span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500">
					background
				</span>
			</h1>

			<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-16 xl:mt-24 justify-center text-sm sm:text-lg">
				<div className="flex flex-col items-center justify-center gap-2 sm:gap-4 bg-white rounded-lg drop-shadow-lg p-4 sm:p-5">
					<img src={assets.upload_icon} className="max-w-9" />
					<div>
						<p className="">Upload image</p>
					</div>
				</div>
				<div className="flex flex-col items-center justify-center gap-2 sm:gap-4 bg-white rounded-lg drop-shadow-lg p-4 sm:p-7">
					<img src={assets.remove_bg_icon} className="max-w-9" />
					<div>
						<p className="">Remove background</p>
					</div>
				</div>
				<div className="flex flex-col items-center justify-center gap-2 sm:gap-4 bg-white rounded-lg drop-shadow-lg p-4 sm:p-7">
					<img src={assets.download_icon} className="max-w-9" />
					<div>
						<p className="">Download image</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Steps;
