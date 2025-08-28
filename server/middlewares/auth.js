import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

const authUser = async (req, res, next) => {
	console.log("I'm in auth.js!");

	try {
		const { token } = req.headers;
		// console.log("req.headers is :>> ", req.headers);

		if (!token) {
			return res.json({
				success: false,
				message: "Not Authorized Login Again",
			});
		}

		const token_decode = jwt.decode(token);
		const clerkId = token_decode.clerkId;

		const user = await userModel.findOne({ clerkId: clerkId });
		if (!user) {
			return res.json({ success: false, message: "User not found" });
		}

		req.user = user;
		next();
	} catch (error) {
		console.log("error :>>>> ", error.message);
		res.json({ success: false, message: error.message });
	}
};

export default authUser;
