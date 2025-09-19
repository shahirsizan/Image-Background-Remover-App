/* eslint-disable react-refresh/only-export-components */
import { useAuth, useClerk, useUser } from "@clerk/clerk-react";
import axios from "axios";
import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { backend_base_url } from "../../../server/workMode";

export const AppContext = createContext();

const AppContextProvider = (props) => {
	const [isLoading, setIsLoading] = useState(true);
	const [credit, setCredit] = useState(0);
	const [image, setImage] = useState(false);
	const [resultImage, setResultImage] = useState(false);

	const navigate = useNavigate();

	const { getToken } = useAuth();
	const { isSignedIn } = useUser();
	const { openSignIn } = useClerk();

	const loadCreditsData = async () => {
		console.log("in loadCreditsData");

		try {
			const token = await getToken();

			if (!token) {
				console.log("Token not found!");
				return;
			}

			const response = await axios.get(
				`${backend_base_url}/api/user/credits`,
				{
					headers: {
						token: token,
					},
				}
			);
			// console.log("loadCreditsData -> response : ", response);

			// if success
			if (response.data.success) {
				setCredit(response.data.userCredits);
				setIsLoading(false);
				console.log("made false");
			}
			// if failure
			else {
				console.warn("Failed to load credits:", response.data.message);
				setCredit(0);
				toast.warning(response.data.message);
			}
		} catch (error) {
			console.error("Credits error:", error);
			setCredit(0);

			// More specific error handling
			if (error.response?.status === 404) {
				toast.error(
					"User account not found. Please ensure your account is properly set up."
				);
			} else if (error.response?.status === 401) {
				toast.error(
					"Authentication failed. Please try logging in again."
				);
			} else {
				toast.error(
					error.response?.data?.message || "Failed to load credits"
				);
			}
		}
	};

	const removeBg = async (image) => {
		try {
			// if not signed in
			if (!isSignedIn) {
				return openSignIn();
			}

			// if signed in
			setImage(image);
			setResultImage(false);
			navigate("/result");

			const token = await getToken();

			const formData = new FormData();
			formData.append("image", image);

			const { data } = await axios.post(
				`${backend_base_url}/api/image/remove-bg`,
				formData,
				{ headers: { token } }
			);

			if (data.success) {
				setResultImage(data.resultImage);
				setCredit(data.creditBalance);
			} else {
				toast.error(data.message);
				setCredit(data.creditBalance);
				if (data.creditBalance === 0) {
					navigate("/buy");
				}
			}
		} catch (error) {
			console.log("error :>> ", error);
			toast.error(error.message);
		}
	};

	const value = {
		credit,
		setCredit,
		loadCreditsData,
		backendUrl: backend_base_url,
		image,
		setImage,
		removeBg,
		resultImage,
		setResultImage,
		isLoading,
		setIsLoading,
	};

	return (
		<AppContext.Provider value={value}>
			{props.children}
		</AppContext.Provider>
	);
};

export default AppContextProvider;
