import { DataTypes } from "sequelize";
import { dbconnection } from "../connection.js";
// models
import { UserModel } from "./user.model.js";
import { postModel } from "./post.model.js";

export const likedUserPost = dbconnection.define('LikedUserPost', {
    userId: {
        type: DataTypes.INTEGER,
        references: {
            key: 'id',
            model: UserModel
        },

        onDelete: "CASCADE",
        allowNull: false,
    },
    postId: {
        type: DataTypes.INTEGER,
        references: {
            key: 'id',
            model: postModel
        },

        onDelete: "CASCADE",
        allowNull: false,

    },
},
    {
        // Define a composite unique key on 'username' and 'email'
        indexes: [
            {
                unique: true,
                fields: ['postId', 'userId'],
            },
        ],
    }
)

await likedUserPost.sync(
    { alter: true, }
)
