import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
	console.log("I'm in auth.js!");

	try {
		const { token } = req.headers;
		console.log("req.headers is :>> ", req.headers);

		if (!token) {
			return res.json({
				success: false,
				message: "Not Authorized Login Again",
			});
		}

		const token_decode = jwt.decode(token);
		console.log("after decoding token: ", token_decode);

		req.headers.clerkId = token_decode.clerkId;
		next();
	} catch (error) {
		console.log("error :>>>> ", error.message);
		res.json({ success: false, message: error.message });
	}
};

export default authUser;
