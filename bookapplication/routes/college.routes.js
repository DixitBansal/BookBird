import express from "express"
import { HandleErrors } from "../middlewares/handleError.js"
import { getAllCollege, getCollegebyID, registerCollege, searchCollege } from "../controllers/college.controller.js"

export const collegeRouter = express.Router()

collegeRouter.route("/search").get(HandleErrors(searchCollege))
collegeRouter.route("/getcollegeid/:id").get(HandleErrors(getCollegebyID))
collegeRouter.route("/getall").get(HandleErrors(getAllCollege))
collegeRouter.route("/register").post(HandleErrors(registerCollege))