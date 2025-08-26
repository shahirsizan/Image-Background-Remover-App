import express from "express";
import authUser from "../middlewares/auth.js";
import upload from "../middlewares/multer.js";
import { removeBgImage } from "../controllers/ImageController.js";

const imageRouter = express.Router();

imageRouter.post(`/remove-bg`, upload.single("image"), authUser, removeBgImage);
/**
 * Above single("image") processes the single file associated with the
 * given form field. The `request` object will be populated with
 * a `file` object containing information about the processed file.
 * @param fieldName Name of the multipart form field to process.
 */
// Signature >>> single(fieldName: string): RequestHandler;

export default imageRouter;
