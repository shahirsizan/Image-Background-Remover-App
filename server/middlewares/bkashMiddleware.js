import axios from "axios";
// khabar-bari project e node-global-storage use korechi to store the token
// here we will utilize the `req.header`. No need to use third party library.

export const bkash_auth = async (req, res, next) => {
	// ⚠️⚠️⚠️ CAUTION. Because the backend is hosted in vercel
	// and env variables not defined in vercel yet,
	// have to explicitely write the env variables here

	const { data } = await axios.post(
		"https://tokenized.sandbox.bka.sh/v1.2.0-beta/tokenized/checkout/token/grant",
		{
			app_key: "4f6o0cjiki2rfm34kfdadl1eqq",
			app_secret: "2is7hdktrekvrbljjh44ll3d9l1dtjo4pasmjvs5vl5qr3fug4b",
		},
		{
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
				username: "sandboxTokenizedUser02",
				password: "sandboxTokenizedUser02@12345",
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

	next();
};
