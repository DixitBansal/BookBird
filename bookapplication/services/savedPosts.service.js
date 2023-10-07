import { dbconnection } from "../db/connection.js";
import { likedUserPost } from "../db/models/liked_post_user.model.js";
import { UserModel } from "../db/models/user.model.js";
import { paginateQuery } from "../utils/db.utils.js";

export function savedPostService() {
    return {
        savePost: async (data) => {
            const { userId, postId } = data;
            const result = await likedUserPost.create({
                userId, postId
            });
            return result.dataValues;

        },

        unSavePost: async (data) => {
            const { postId, userId } = data;
            const result = await likedUserPost.destroy({
                where: {
                    postId, userId
                },
                force: true
            });

            console.log(result);
            return result.dataValues;

        },

        view: async (userid, { limit = 5, page = 1 }) => {
            let queryString = "SELECT * FROM liked_post_view "
            queryString += "WHERE seller_ID=" + userid
            queryString = paginateQuery(queryString, limit, page)
            const result = await dbconnection.query(queryString)
            console.log(result[0])
            return result[0];
        }




    }
}