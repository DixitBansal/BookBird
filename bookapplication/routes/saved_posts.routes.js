import express from "express";
import { HandleErrors } from "../middlewares/handleError.js";
import { savedPostController } from "../controllers/saved_posts.controller.js";

export const savedPostsRouter = express.Router();
const SAVED_POSTS_CONTROLLER = savedPostController();
savedPostsRouter.route("/save/:postId").put(HandleErrors(SAVED_POSTS_CONTROLLER.savePost));
savedPostsRouter.route("/unsave/:postId").put(HandleErrors(SAVED_POSTS_CONTROLLER.unsavePost));
savedPostsRouter.route("/view-saved").get(HandleErrors(SAVED_POSTS_CONTROLLER.view));
