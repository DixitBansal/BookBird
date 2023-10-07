import { authService } from "../services/auth.services.js";
import { generateResponse } from "../utils/response.utils.js";
import jwt from "jsonwebtoken";

export function createAuthControllers() {
  const authServices = authService();

  return {
    login: async (req, res) => {
      const response = await authServices.login(req.body);
      if (response.success) {
        const { id, acc_type } = response.result;

        req.session.userId = id;
        req.session.acc_type = acc_type;
        console.log("****************", req.session);
        return res.status(200).json(generateResponse({ msg: "login successfull", result: response.result }));
        // console.log("****************", req.session);
      }
      return res.status(403).json(generateResponse({ msg: "Incorrent Password", result: response.result }));
    },

    googlelogin: (req, res) => {
      return res.json({ good: "luck" });
    },

    registerUser: async (req, res) => {
      const response = await authServices.register(req.body);
      res.status(200).send(
        generateResponse({
          msg: "account created successfully",
          success: true,
        })
      );
    },

    sendVerificationEmail: async (req, res) => {
      const response = await authServices.sendVerificationEmail(req.body);
      res.status(200).send(response.msg);
    },

    verifytoken: async (req, res) => {
      const token = req.query.token;
      const secretKey = "bookde";

      jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
          console.error("Error verifying token:", err);
          res.status(400).send("Invalid or expired token");
        } else {
          res
            .status(200)
            .redirect(`http://localhost:3000/reset-password?token=${token}`);
        }
      });
    },

    resetPassword: async (req, res) => {
      const secretKey = "bookde";
      const token = req.query.token;
      let phone = "";
      jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
          console.error("Error verifying token:", err);
          res.status(400).send("Invalid or expired token");
        } else {
          phone = decoded.phone;
        }
      });
      const data = { phone, ...req.body };
      console.log("data=", data);
      const response = await authServices.resetPassword(data);
      res.status(200).send(response.msg);
    },
    logout: async (req, res, next) => {
      console.log("((((((((((((((((((((((((((((((((((((((((((((")
      console.log(Object.keys(req.session))
      console.log(req.session)
      for (let x in req.session) {
        if (x != 'cookie') {
          delete req.session[x]
        }
      }
      console.log(req.session)
      console.log("((((((((((((((((((((((((((((((((((((((((((((")
      return res.json(generateResponse({ msg: "loggedOut Successfully" }))
    }
  };
}
