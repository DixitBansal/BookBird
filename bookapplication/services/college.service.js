import { dbconnection } from "../db/connection.js";
import { CollegeModel } from "../db/models/college.model.js"
import { createOptions } from "../utils/basic.utils.js";
import { paginateQuery } from "../utils/db.utils.js";
import { QueryTypes } from "sequelize";

export async function registerCollege(data, transaction = null) {

    const options = createOptions(transaction)

    const newcollege = {
        collegeName: data.collegeName,
        city: data.city,
        pincode: data.pincode
    }
    const result = await CollegeModel.create(newcollege, options)
    return result.dataValues
}

export async function searchCollege(data, transaction) {
    /**
     * data : {
     *  keyword : "",
     *  columns : [],
     *  limit : 5
     *  page : 1
     * }
     */
    // will search by bookName, bookAuthor, publication
    let queryString = "SELECT "
    for (let x in data.columns) {
        queryString = queryString + data.columns[x]
        if (x < data.columns.length - 1) {
            queryString += ","
        }
    }
    queryString += ` FROM Colleges WHERE collegeName LIKE '%${data.keyword}%' OR city LIKE '%${data.keyword}%' OR pincode LIKE '%${data.keyword}%'`
    queryString = paginateQuery(queryString, data.limit, data.page)
    const result = await dbconnection.query(queryString, { transaction: transaction, type: QueryTypes.SELECT })
    return result
}

export async function getAllCollege(transaction = null) {

    const options = createOptions(transaction)
    let queryString = "SELECT * FROM Colleges"
    // queryString = paginateQuery(queryString, data.limit, data.page)
    const [result, metadata] = await dbconnection.query(queryString, options)
    console.log(result)
    return result

}

export async function getCollegeByID(data, transaction = null) {
    const options = createOptions(transaction)
    const result = await CollegeModel.findByPk(data.id, options)
    return result.dataValues
}