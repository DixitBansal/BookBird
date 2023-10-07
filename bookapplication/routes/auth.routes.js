import express from "express";
// controllers
import { createAuthControllers } from "../controllers/auth.controller.js";
import { HandleErrors } from "../middlewares/handleError.js";
// middleware
import { isUserLoggedIn } from "../middlewares/user.middleware.js"

export const authRouter = express.Router();
const authControllers = createAuthControllers();

authRouter.route("/login").post(HandleErrors(authControllers.login));

authRouter.route("/googlelogin").get(HandleErrors(authControllers.googlelogin));

authRouter.route("/register").post(HandleErrors(authControllers.registerUser));

authRouter.route("/verify").get(HandleErrors(authControllers.verifytoken));

authRouter
  .route("/email-verification")
  .post(HandleErrors(authControllers.sendVerificationEmail));

authRouter
  .route("/reset-password")
  .post(HandleErrors(authControllers.resetPassword));

authRouter.route("/logout")
  .get(isUserLoggedIn, authControllers.logout)