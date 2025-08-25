import express from "express";
import authUser from "../middlewares/auth.js";

const imageRouter = express.Router();

imageRouter.post(`/remove-bg`, authUser, removeBgImageControllerImplementLater);

export default imageRouter;
