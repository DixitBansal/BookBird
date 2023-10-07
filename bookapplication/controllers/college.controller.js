import {
    searchCollege as scollege,
    getAllCollege as gacollege,
    registerCollege as rcollege,
    getCollegeByID as gcid
} from "../services/college.service.js"
import { generateResponse } from "../utils/response.utils.js"

export async function searchCollege(req, res, next) {
    const data = {
        keyword: req.query.search,
        columns: ["*"],
        limit: req.query.limit || 5,
        page: req.query.page || 1
    }
    const result = await scollege(data)
    return res.json(generateResponse({ msg: "found successfully", result }))
}

export async function getAllCollege(req, res, next) {
    // let data = {
    //     limit: req.query.limit,
    //     page: req.query.page
    // }
    let result = await gacollege()
    return res.json(generateResponse({ msg: "college found", result }))
}

export async function getCollegebyID(req, res, next) {
    let collegeID = req.params.id
    const result = await gcid({ id: collegeID })
    return res.json(generateResponse("college found successfully", "success", result))
}

export async function registerCollege(req, res, next) {
    const data = {
        collegeName: req.body.collegeName,
        city: req.body.city,
        pincode: req.body.pincode
    }
    const result = await rcollege(data)
    return res.json(generateResponse({ msg: "Book created successfully", result }))
}

export async function getCollegeNames(req, res, next) {
    const data = {
        keyword: req.query.search,
        columns: ["*"],
        limit: req.query.limit || 5,
        page: req.query.page || 1
    }
    const result = await scollege(data)
    let collegeNames = []
    for (let x of result) {
        collegeNames.push(`${x.collegeName}, ${x.city}, ${x.pincode}`)
    }
    return res.json(generateResponse({ msg: "found successfully", collegeNames }))
}
