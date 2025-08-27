import axios from "axios";
// khabar-bari project e node-global-storage use korechi to store the token
// here we will utilize the `req.header`. No need to use third party library.

export const bkash_auth = async (req, res, next) => {
	const response = await axios.post(
		bkash_grant_token_url,
		{
			app_key: process.env.bkash_api_key,
			app_secret: process.env.bkash_secret_key,
		},
		{
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
				username: process.env.bkash_username,
				password: process.env.bkash_password,
			},
		}
	);

	console.log("response in bkashmiddleware: ", response);
};
