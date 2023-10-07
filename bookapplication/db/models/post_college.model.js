import { DataTypes } from "sequelize";
import { dbconnection } from "../connection.js";
// models
import { postModel } from "../models/post.model.js"
import { CollegeModel } from "../models/college.model.js"

export const postCollegeModel = dbconnection.define("Post_College", {
    post_ID: {
        type: DataTypes.INTEGER,
        references: {
            key: "id",
            model: postModel
        },
        onDelete: "CASCADE"
    },
    college_ID: {
        type: DataTypes.INTEGER,
        references: {
            key: "id",
            model: CollegeModel
        },
        onDelete: "CASCADE"
    },
}, {
    timestamps: false
})

await postCollegeModel.sync(
    // { alter: true }
)
