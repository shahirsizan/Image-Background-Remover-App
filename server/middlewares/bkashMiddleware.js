import axios from "axios";
// khabar-bari project e node-global-storage use korechi to store the token
// here we will utilize the `req.header`. No need to use third party library.

export const bkash_auth = async (req, res, next) => {
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

	const id_token = data.id_token;
	const refresh_token = data.refresh_token;
	// console.log("id_token : ", id_token);
	// console.log("refresh_token : ", refresh_token);
	// OK in vercel log
	req.bkash = {
		id_token: id_token,
		refresh_token: refresh_token,
	};

	// console.log("okkkkkk");

	next();
};
