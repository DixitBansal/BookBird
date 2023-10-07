import { DataTypes } from "sequelize";
import { dbconnection } from "../connection.js";
import { postModel } from "./post.model.js";

export const PostImageModel = dbconnection.define('Post_Image', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    imageUrl: {
        type: DataTypes.STRING,
        allowNull: false
    },
    mimeType: {
        type: DataTypes.STRING,
        defaultValue: "image/jpeg"
    },
    postId: {
        type: DataTypes.INTEGER,
        references: {
            key: 'id',
            model: postModel
        },
        onDelete: "CASCADE"
    }
})

await PostImageModel.sync(
    // {alter : true}
)

export const videoModel = dbconnection.define("Video", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    videoName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    videoSize: {
        type: DataTypes.INTEGER,
        max: 500000000,
        allowNull: false
    },
    videoDuration: {
        type: DataTypes.INTEGER
    },
    postId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            key: "id",
            model: postModel
        },
        onDelete: "CASCADE",
    },
    history: {
        type: DataTypes.JSON
    }
})

await videoModel.sync(
    // { alter: true }
)
