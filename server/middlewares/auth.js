import jwt from "jsonwebtoken";

// Middleware funciton to decode jwt token to clerkId
const authUser = async (req, res, next) => {
	console.log("ami auth.js e 1");

	try {
		const { token, ajaira } = req.headers;
		// console.log("req.headers is :>> ", req.headers);

		if (!token) {
			return res.json({
				success: false,
				message: "Not Authorized Login Again",
			});
		}

		const token_decode = jwt.decode(token);
		// console.log("after decoding token, clerkId is: ", token_decode.clerkId);

		req.headers.clerkId = token_decode.clerkId;
		next();
	} catch (error) {
		console.log("error :>>>> ", error.message);
		res.json({ success: false, message: error.message });
	}
};

export default authUser;
