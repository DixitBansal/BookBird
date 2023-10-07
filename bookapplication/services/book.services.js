import { dbconnection } from "../db/connection.js";
import { QueryTypes } from "sequelize";
import { BookModel } from "../db/models/book.model.js";
// utils
import { createOptions } from "../utils/basic.utils.js"
import { paginateQuery } from "../utils/db.utils.js";
// errors
import { bookErrors } from "../error/book.error.js";

export async function bookSearch(data, transaction = null) {
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
    queryString += ` FROM Books WHERE bookName LIKE '%${data.keyword}%' OR subject LIKE '%${data.keyword}%' OR publication LIKE '%${data.keyword}%' OR bookAuthor LIKE '%${data.keyword}%'`
    queryString = paginateQuery(queryString, data.limit, data.page)
    const result = await dbconnection.query(queryString, { transaction: transaction, type: QueryTypes.SELECT })
    return result
}

export async function getBookByAttributes(attribute, keyword = null, { columns = ["*"], limit = 5, page = 1 }, transaction = null) {
    /**
     * return the book after searching the provided attribute in the database
     * @param attribute : what attribute(column) to search for
     * @param keyword : what to search in the attribute(column)
     */
    if (keyword === null) {
        throw bookErrors.keywordnotnull
    }
    const options = createOptions(transaction)
    let queryString = "SELECT DISTINCT "
    for (let x in columns) {
        queryString = queryString + columns[x]
        if (x < columns.length - 1) {
            queryString += ","
        }
    }
    queryString += ` FROM Books WHERE ${attribute} LIKE '%${keyword}%'`
    queryString = paginateQuery(queryString, limit, page)
    const [result, metadata] = await dbconnection.query(queryString, options)
    return result
}

export async function getBookByISBN(ISBN, transaction = null) {
    const options = createOptions(transaction)
    const [result, metadata] = await dbconnection.query(`SELECT * FROM Books WHERE ISBN LIKE '%${ISBN}%'`)
    return result
}

export async function getAllBooks(data, transaction = null) {
    /**
     * data = {
     *  limit : 5
     *  page : 1,
     *  orderby : 
     * }
     */
    const options = createOptions(transaction)
    let queryString = `SELECT * FROM Books`
    queryString = paginateQuery(queryString, data.limit, data.page)
    const [result, metadata] = await dbconnection.query(queryString, options)
    return result
}

export async function bookRegister(data, transaction = null) {
    const options = createOptions(transaction)
    let newBook = {}
    for (let x in data) {
        newBook[x] = data[x]
    }
    const newbook = await BookModel.create(newBook, options)
    return newbook.dataValues
}

export async function getBookByID(data, transaction = null) {
    const options = createOptions(transaction)
    const newbook = await BookModel.findByPk(data.id, options)
    return newbook.dataValues
}