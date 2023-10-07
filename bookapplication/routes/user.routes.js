import express from "express";
import { userController } from "../controllers/user.controller.js";
import { HandleErrors } from "../middlewares/handleError.js";
// middleware
import { isUserLoggedIn } from "../middlewares/user.middleware.js";

export const userRouter = express.Router();
const userControllers = userController();
userRouter
  .route("/pre-signed-url")
  .post(HandleErrors(userControllers.gettingPresignedUrl));
console.log("here");
userRouter.route("/pre-signed-url/delete").post(HandleErrors(userControllers.deletingPresignedUrl))

userRouter.route("/profile").get(isUserLoggedIn, HandleErrors(userControllers.getUserProfile))
userRouter.route("/update").put(isUserLoggedIn, HandleErrors(userControllers.updateUserProfile))