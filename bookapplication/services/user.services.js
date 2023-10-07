import { generateResponse } from "../utils/response.utils.js";
import { gettingPreSignedUrl } from "./helper.js";
import AWS from "aws-sdk";

import { UserModel } from "../db/models/user.model.js";

export const userService = () => {
  return {
    getPresignedURL: async (data) => {
      const { fileFormat, userId, type } = data;
      console.log(data);
      if (!fileFormat || !userId || !type) {
        return {
          success: false,
          message: "invalid arguments",
        };
      }
      const filePath = `images/${type}/${userId}${new Date().getTime()}.${fileFormat}`;
      const preSignedURL = await gettingPreSignedUrl(filePath, fileFormat);

      if (preSignedURL) {
        return generateResponse({
          msg: "",
          success: true,
          result: preSignedURL,
        });
      } else {
        const response = {
          success: false,
          msg: "image_not_uploaded",
          result: preSignedURL,
        };
        return generateResponse(response);
      }
    },
    deletePresignedUrl: async (url) => {
      AWS.config.update({
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_KEY,
        region: "ap-south-1",
      });
      console.log(url);
      const urlParts = url.split('/');
      const bucketName = urlParts[2].split('.')[0];
      const objectKey = urlParts.slice(3).join('/');

      const params = {
        Bucket: bucketName,
        Key: objectKey,
      };
      const s3 = new AWS.S3();

      s3.deleteObject(params, (err, data) => {
        if (err) {
          console.error(err);
          return generateResponse({ msg: "image not deleted", success: false })
        } else {
          console.log(data);
          console.log('Image deleted successfully.');
          return generateResponse({ msg: "image deleted successfully", success: true });
        }
      });
    },

    getUserProfile: async (userId) => {
      let user = await UserModel.findByPk(userId)
      return user
    },

    updateUserProfile: async (userId, updateData) => {
      const userdata = await UserModel.update(updateData, {
        where: {
          id: userId
        }
      })
      return userdata
    }
  };
};
