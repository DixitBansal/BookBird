import express from "express"
import { bookControllers } from "../controllers/book.controller.js"
import { HandleErrors } from "../middlewares/handleError.js"

export const bookRouter = express.Router()
const bookController = bookControllers()

bookRouter.route('/search').get(HandleErrors(bookController.searchBook))
bookRouter.route('/register').post(HandleErrors(bookController.createBook))
bookRouter.route('/getbyid/:id').get(HandleErrors(bookController.getbookId))
// bookRouter.route("/delete/:id").delete()
// bookRouter.route("/update/:id").put()
bookRouter.route("/getbooknames").get(HandleErrors(bookController.getBookNames))
bookRouter.route("/getbooks").get(HandleErrors(bookController.getAllBooks))
bookRouter.route("/getbyisbn").get(HandleErrors(bookController.getBookByISBN))
bookRouter.route("/getbyattr").post(HandleErrors(bookController.getBookByAttr))