import { generateResponse } from "../utils/response.utils.js"

export function isUserLoggedIn(req, res, next) {
    console.log("-------", req.session)
    if(req.session.userId){
        next()
    }
    else {
        res.json(generateResponse({ msg: "Not LoggedIn" }))
    }
}