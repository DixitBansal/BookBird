import { dbconnection } from "../db/connection.js"
import { postModel } from "../db/models/post.model.js"
import { postCollegeModel } from "../db/models/post_college.model.js"
import { createOptions } from "../utils/basic.utils.js"
// errors
import { postErrors } from "../error/post.error.js"
import { paginateQuery } from "../utils/db.utils.js"

export async function postCreate(data, transaction = null) {
    const options = createOptions(transaction)

    let newpostobj = {
        seller_ID: data.sellerID,
        book_ID: data.bookID,
        postDescription: data.postDescription,
    }
    if (data.isNegotiable === false) {
        newpostobj.isNegotiable = data.isNegotiable
    }
    if (data.soldStatus === true) {
        newpostobj.soldStatus = true
    }

    const newpost = await postModel.create(data, options)
    return newpost.dataValues
}

export async function deletePostByID(data, transaction = null) {

    const options = createOptions(transaction)
    const postID = data.postID
    const result = await postModel.destroy({
        where: {
            id: postID
        }
    }, options)
    return result

}

export async function getPostByID(data, transaction = null) {
    const options = createOptions(transaction)

    const postID = data.postID
    const result = await postModel.findByPk(postID, options)
    return result

}

export async function updatePost(data, transaction = null) {
    const options = createOptions(transaction)

    const result = await postModel.update(data.update, {
        where: {
            id: data.postID
        }
    }, options)

    return result

}

export async function registerCollegePost(data, transaction = null) {

    /**
     * data : {
     *  obj : [
     *  {postID : "", collegeID : ""},
     *  {postID : "", collegeID : ""},
     *  {postID : "", collegeID : ""},
     *  {postID : "", collegeID : ""}
     * ]
     * }
     */
    const options = createOptions(transaction)

    const result = await postCollegeModel.bulkCreate(data.obj, options)

    return result.dataValues
}

export async function getPostByBookID({ book_ID = null, limit = 5, page = 1 }, transaction = null) {
    /**
     * return the post(s) matching to the book_ID(s)
     * @param book_ID - primary keys of the book in a list,
     * @returns [posts]
     */
    if (book_ID === null) {
        throw postErrors.bookIDNULLError
    }

    let findString = ""
    for (let x in book_ID) {
        findString += book_ID[x]
        if (x != book_ID.length - 1) {
            findString += ", "
        }
    }

    if (findString === "") {
        return []
    }

    const options = createOptions(transaction)

    let queryString = "SELECT * FROM post_book_view"
    queryString += ` WHERE book_ID IN (${findString})`
    queryString = paginateQuery(queryString, limit, page)
    const result = await dbconnection.query(queryString, options)
    result[0] = parseAuthors(result[0])
    return result[0]
}

export async function recommandedPost({ limit = 5, page = 1 }, transaction = null) {
    /**
     * @params limit and page in an object
     * @return return a list of post in a paginated from that are aranged according to the 
     *         decresing created time
     */
    let queryString = "SELECT * FROM post_book_view"
    queryString = paginateQuery(queryString, limit, page)
    const result = await dbconnection.query(queryString)
    result[0] = parseAuthors(result[0])
    return result[0];
}

export async function getPostByUserId(userid, { limit = 2, page = 1 }) {
    let queryString = "SELECT id, bookName, subject, bookEdition, sellingPrice, img_urls, updatedAt FROM post_book_view "
    queryString += "WHERE seller_ID=" + userid
    queryString = paginateQuery(queryString, limit, page)
    const result = await dbconnection.query(queryString)
    return result[0]
}

export async function getPostBooksById(postid) {
    let queryString = `SELECT * FROM post_book_view `
    queryString += `WHERE id=${postid}`
    const result = await dbconnection.query(queryString)
    return result[0]
}

function parseAuthors(data) {
    for (let i = 0; i < data.length; i++) {
        data[i].bookAuthor = JSON.parse(data[i].bookAuthor)
    }
    return data
}