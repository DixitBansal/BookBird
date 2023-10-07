import { userService } from "../services/user.services.js";
import { generateResponse } from "../utils/response.utils.js";

export function userController() {
  const userServices = userService();
  return {
    gettingPresignedUrl: async (req, res) => {
      const response = await userServices.getPresignedURL({
        ...req.body,
        userId: req.session.userId,
      });
      res.status(200).send(response);
    },
    deletingPresignedUrl: async (req, res) => {
      console.log(req.body);
      const response = await userServices.deletePresignedUrl(req.body.presigned);
      res.status(200).send(response);
    },

    getUserProfile: async (req, res) => {
      const userId = req.session.userId
      const response = await userServices.getUserProfile(userId)
      return res.json(generateResponse({ msg: "loggedin", result: response }))
    },

    updateUserProfile: async (req, res) => {
      const userId = req.session.userId
      const updatedata = await userServices.updateUserProfile(userId, req.body)
      return res.json(generateResponse({msg : "update successfully", result : updatedata}))
    }
  };
}
