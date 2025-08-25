import express from "express";
import authUser from "../middlewares/auth.js";

const imageRouter = express.Router();

imageRouter.post(`/remove-bg`, upload.single("image"), authUser, removeBgImage);
/**
 * Above single("image") returns middleware that processes a single file associated with the
 * given form field.
 * The `request` object will be populated with a `file` object containing
 * information about the processed file.
 * @param fieldName Name of the multipart form field to process.
 */
// Signature >>> single(fieldName: string): RequestHandler;

export default imageRouter;
