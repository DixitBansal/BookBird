import { dbconnection } from "../db/connection.js";
import nodemailer from "nodemailer";
import { UserModel } from "../db/models/user.model.js";
import { generateResponse } from "../utils/response.utils.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export function authService() {
  return {
    login: async (data) => {
      const { phone, password, acc_type } = data;
      console.log(data);
      const user = await UserModel.findOne({
        where: { contacts: phone, acc_type: acc_type },
      });
      // console.log(user);

      const usersData = user?.toJSON() || null;
      // console.log("usersdata=", usersData);

      if (usersData) {
        // match password
        const isPasswordMatch = await bcrypt.compare(
          password.trim(),
          usersData.password ? usersData.password : ""
        );
        console.log(
          ">>>>>>>>>>>>>>>>>>>>>>>>>isPasswordMatch",
          isPasswordMatch
        );

        if (isPasswordMatch) {
          return generateResponse({
            msg: "user logged in successfully",
            success: true,
            result: { ...usersData },
          });
        } else {
          return generateResponse({
            msg: "incorrect password",
            success: false,
          });
        }
      } else {
        return generateResponse({
          msg: `No User found with phone number ${phone}.`,
          success: false,
          statusCode: 404,
        });
      }
    },

    register: async (data) => {
      const { username, email, phone, password } = data;
      console.log(data);
      const result = await UserModel.create({
        userNames: username,
        contacts: phone,
        password: password,
        email: email,
      });

      const userdata = result.toJSON();
      return userdata;
    },

    sendVerificationEmail: async (data) => {
      const { phone } = data;
      console.log(phone);
      const result = await UserModel.findOne({
        where: { contacts: phone },
        attributes: ["email"],
      });

      const email = String(result.email);
      console.log(email);
      let response = {};
      if (email) {
        const transporter = nodemailer.createTransport({
          service: "Gmail",
          auth: {
            user: "bookdee42@gmail.com",
            pass: "mzkkznivkdprasmn",
          },
        });
        const secretKey = "bookde";
        const token = jwt.sign({ phone: phone }, secretKey, {
          expiresIn: "1h",
        });
        const resetPasswordURL = `http://localhost:4000/api/v1/auth/verify?token=${token}`;

        const mailOptions = {
          from: "bookdee42@gmail.com",
          to: email,
          subject: "Reset your password",
          html: `Please click this <a href="${resetPasswordURL}">link</a> to reset your password.`,
        };

        function sendEmail(mailOptions) {
          return new Promise((resolve, reject) => {
            transporter.sendMail(mailOptions, (error, info) => {
              if (error) {
                reject(error);
              } else {
                resolve(info);
              }
            });
          });
        }

        await sendEmail(mailOptions)
          .then((info) => {
            console.log("info=", info);
            response = {
              msg: `Email sent: ${info.response}`,
              success: true,
              result: token,
            };
          })
          .catch((error) => {
            console.error("Error sending email:", error);
            response = {
              msg: "Error sending email",
              success: false,
              result: null,
            };
          });
        return response;
      } else {
        return generateResponse({
          msg: "account not found with this phone",
          success: false,
          statusCode: 404,
        });
      }
    },

    resetPassword: async (data) => {
      const { newPassword, phone } = data;
      const result = await UserModel.update(
        { password: newPassword },
        {
          where: {
            contacts: phone,
          },
        }
      );
      // Update the user's password in the database
      // ...
      // Destroy the session
      return generateResponse({
        msg: "password reset successfully",
        success: true,
      });
    },
  };
}
