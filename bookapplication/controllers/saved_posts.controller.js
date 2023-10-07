import { savedPostService } from "../services/savedPosts.service.js";
import { generateResponse } from "../utils/response.utils.js";

export function savedPostController() {
    const savedPostServices = savedPostService();
    return {
        savePost: async (req, res) => {
            const data = { postId: req.params.postId, userId: req.session.userId };
            const response = await savedPostServices.savePost(data);
            return res.json(generateResponse({ msg: "Bookmarked successfully", response }))
        },
        unsavePost: async (req, res) => {
            console.log(req.params.postId);
            const data = { postId: req.params.postId, userId: req.session.userId };
            const response = await savedPostServices.unSavePost(data);
            return res.json(generateResponse({ msg: "unbookmarked successfully", response }))
        },
        view: async (req, res) => {
            const userid = req.session.userId
            const savedPosts = await savedPostServices.view(userid, { limit: req.query.limit, page: req.query.page })
            return res.json(generateResponse({ msg: "saved post found", result: savedPosts }));
        }
    }
}