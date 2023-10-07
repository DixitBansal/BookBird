import { generateResponse } from "../utils/response.utils";

export function authenticate(req, res, next) {
  if (req.session && req.session.userId && req.session.acc_type) {
    return next();
  } else {
    return res.status(401).send(
      generateResponse({
        msg: "sorry you are not authorised",
        success: "false",
        statusCode: 401,
      })
    );
  }
}
