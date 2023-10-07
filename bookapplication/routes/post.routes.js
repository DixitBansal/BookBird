import express from "express"
import { HandleErrors } from "../middlewares/handleError.js"
// controllers
import { postController } from "../controllers/post.controller.js"
// middleware
import { isUserLoggedIn } from "../middlewares/user.middleware.js"

export const postRouter = express.Router()
const postControllers = postController()

postRouter.route("/").get(HandleErrors(postControllers.recommandedPost)) // will return random posts
postRouter.route("/register").post(isUserLoggedIn, HandleErrors(postControllers.registerPost))
postRouter.route("/postbookid").post(HandleErrors(postControllers.getByBookId))
postRouter.route("/postbyuserid").get(isUserLoggedIn, HandleErrors(postControllers.getPostByUserId))
postRouter.route("/getbyid/:id").get(isUserLoggedIn, HandleErrors(postControllers.getPostById))