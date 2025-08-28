import axios from "axios";
import fs from "fs";
import FormData from "form-data";
import userModel from "../models/userModel.js";

export const removeBgImage = async (req, res) => {
	try {
		const { user } = req;

		// user er balance check koro
		if (user.creditBalance === 0) {
			return res.json({
				success: false,
				message: "No Credit Balance",
				creditBalance: user.creditBalance,
			});
		}

		// from the multer middleware, the `req` object is populated
		// with a `file` object containing information about the file.
		if (!req.file) {
			return res
				.status(400)
				.json({ success: false, message: "No file uploaded!" });
		}

		// if sufficient balance and file exist...
		// console.log(req.file);
		// {
		//   fieldname: 'image',
		//   originalname: 'zisan picture.jpg',
		//   encoding: '7bit',
		//   mimetype: 'image/jpeg',
		//   destination: 'C:\\Users\\shahi\\AppData\\Local\\Temp',
		//   filename: '1756142184648_zisan picture.jpg',
		//   path: 'C:\\Users\\shahi\\AppData\\Local\\Temp\\1756142184648_zisan picture.jpg',
		//   size: 99303
		// }

		// store file in our server
		const imagePath = req.file.path;
		const imageFile = fs.createReadStream(imagePath);

		// now time to upload the file to the third party service providers server
		// (The bg-remover api server)
		const formData = new FormData();
		formData.append("image_file", imageFile);

		// ref: https://clipdrop.co/apis/docs/remove-background
		const { data, headers } = await axios.post(
			"https://clipdrop-api.co/remove-background/v1",
			formData,
			{
				headers: { "x-api-key": process.env.CLIPDROP_API },
				responseType: "arraybuffer",
			}
		);
		// console.log("imageController -> api call -> headers: ", headers);

		const base64Image = Buffer.from(data, "binary").toString("base64");
		const resultImage = `data:${headers["content-type"]};base64,${base64Image}`;

		// Instead of: await userModel.findByIdAndUpdate(user._id, { creditBalance: user.creditBalance - 1 });
		// Use an atomic operator:
		const updatedUser = await userModel.findByIdAndUpdate(
			user._id,
			{ $inc: { creditBalance: -1 } }, // Use $inc to atomically decrement
			{ new: true } // Return the updated document
		);

		res.json({
			success: true,
			resultImage: resultImage,
			creditBalance: updatedUser.creditBalance,
			message: "Background Removed",
		});
	} catch (error) {
		console.log("Error in removeBgImage controller: ", error.message);
		res.json({ success: false, message: error.message });
	}
};
