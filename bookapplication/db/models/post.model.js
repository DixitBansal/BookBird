import { DataTypes } from "sequelize";
import { dbconnection } from "../connection.js";
// models
import { UserModel } from "../models/user.model.js"
import { BookModel } from "./book.model.js";

export const postModel = dbconnection.define("Posts", {
    seller_ID: {
        type: DataTypes.INTEGER,
        references: {
            key: 'id',
            model: UserModel
        },
        allowNull: false,
        onDelete: "CASCADE"
    },
    post_date: {
        type: DataTypes.DATE,
        defaultValue: Date.now,
        get() {
            const post_date = this.getDataValue('post_date')
            return new Date(post_date).toISOString()
        }
    },
    book_ID: {
        type: DataTypes.INTEGER,
        references: {
            key: 'id',
            model: BookModel
        },
        allowNull: false,
        onDelete: "CASCADE"
    },
    soldStatus: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
    },
    isNegotiable: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    postDescription: {
        type: DataTypes.TEXT
    },
    isVerified: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    accessibility: {
        type: DataTypes.STRING,
        // validate: {
        //     isIn: ["public", "personal"]
        // },

        defaultValue: "public",
    },
    sellingPrice: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
})

await postModel.sync(
    // { alter: true }
)
