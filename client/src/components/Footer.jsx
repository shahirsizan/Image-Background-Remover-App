import { assets } from "../assets/assets";
import { Link } from "react-router-dom";
import { FaFacebook } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";

const Footer = () => {
	const nowYear = new Date().getFullYear();

	return (
		<div className="flex items-center justify-between gap-4 px-4 lg:px-44 py-3">
			<img width={150} src={assets.logo} />

			<p className="max-sm:hidden flex-1 border-l border-gray-400 pl-4 text-sm text-gray-500">
				Copyright ©Shahir Adil Sizan | {nowYear}
			</p>

			<div className="flex gap-1 sm:gap-2">
				<Link
					to={"https://www.facebook.com/shahiradilsizan/"}
					target="_blank"
					className="flex items-center justify-center py-1 sm:py-3"
				>
					<FaFacebook className="w-6 h-6 sm:w-6 sm:h-6" />
				</Link>

				<Link
					to={"https://www.linkedin.com/in/shahir-adil-sizan/"}
					target="_blank"
					className="flex items-center justify-center py-1 sm:py-3 "
				>
					<FaLinkedin className="w-6 h-6 sm:w-6 sm:h-6" />
				</Link>

				<Link
					to={"https://github.com/shahirsizan"}
					target="_blank"
					className="flex items-center justify-center py-1 sm:py-3"
				>
					<FaGithub className="w-6 h-6 sm:w-6 sm:h-6" />
				</Link>
			</div>
		</div>
	);
};

export default Footer;
