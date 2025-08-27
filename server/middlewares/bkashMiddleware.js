import axios from "axios";
// khabar-bari project e node-global-storage use korechi to store the token
// here we will utilize the `req.header`. No need to use third party library.

export const bkash_auth = async (req, res, next) => {
	console.log("inside bkash middleware");

	const { data } = await axios.post(
		process.env.bkash_grant_token_url,
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

	console.log("data in bkashmiddleware: ", data);
};
