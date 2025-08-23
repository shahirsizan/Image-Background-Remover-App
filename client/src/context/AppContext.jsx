/* eslint-disable react-refresh/only-export-components */
import { useAuth, useClerk, useUser } from "@clerk/clerk-react";
import axios from "axios";
import { createContext, useState } from "react";
import { toast } from "react-toastify";

export const AppContext = createContext();

const AppContextProvider = (props) => {
	const [credit, setCredit] = useState(0);

	const backendUrl = import.meta.env.VITE_BACKEND_URI;

	const { getToken } = useAuth();
	const { isSignedIn } = useUser();
	const { openSignIn } = useClerk();

	const loadCreditsData = async () => {
		try {
			const token = await getToken();

			if (!token) {
				console.log("Token not found!");
				return;
			}

			const response = await axios.get(backendUrl + `/api/user/credits`, {
				headers: {
					token: token,
					ajaira: "hudai",
				},
			});

			// console.log("response : ", response);

			if (response.data.success) {
				setCredit(response.data.userCredits);
			} else {
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

	const value = {
		credit,
		setCredit,
		loadCreditsData,
		backendUrl,
	};

	return (
		<AppContext.Provider value={value}>
			{props.children}
		</AppContext.Provider>
	);
};

export default AppContextProvider;
