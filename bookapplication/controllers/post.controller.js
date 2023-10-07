import { dbconnection } from "../db/connection.js"
import { bookRegister, bookSearch } from "../services/book.services.js"
import { getPostByBookID, postCreate, recommandedPost, getPostByUserId, getPostBooksById } from "../services/post.service.js"
import { registerCollegePost } from "../services/post.service.js"
import { registerCollege } from "../services/college.service.js"
import { registerPostImages } from "../services/image.services.js"
import { postErrors } from "../error/post.error.js"
import { generateResponse } from "../utils/response.utils.js"

export function postController(req, res, next) {

    return {
        registerPost: async (req, res, next) => {
            let transaction = null
            try {
                transaction = await dbconnection.transaction()

                // book
                let postdata = {}
                if (!req.body.book.foundStatus) {
                    // add the book details to the book table
                    let bookdata = {
                        bookName: req.body.book.bookName,
                        bookEdition: req.body.book.bookEdition,
                        bookAuthor: JSON.stringify(req.body.book.bookAuthor),
                        bookMRP: req.body.book.bookMRP,
                        subject: req.body.book.subject,
                        publication: req.body.book.publication,
                        ISBN: req.body.book.ISBN
                    }
                    const result = await bookRegister(bookdata, transaction)
                    postdata.book_ID = result.id
                }
                else {
                    postdata.book_ID = req.body.book.book_ID
                }

                // create post
                for (let x in req.body) {
                    if (x !== "book" && x != "college") {
                        postdata[x] = req.body[x]
                    }
                }
                console.log(req.session.userId)
                postdata.seller_ID = req.session.userId
                const result = await postCreate(postdata, transaction)

                // create association between colleges and posts
                let collegePostdata = []
                for (let x of req.body.college) {
                    if (!x.foundStatus) {
                        // add college to the list of colleges
                        let collegeData = {
                            collegeName: x.collegeName,
                            city: x.city,
                            pincode: x.pincode
                        }
                        const college = await registerCollege(collegeData, transaction)
                        collegePostdata.push({ post_ID: result.id, college_ID: college.id })
                    }
                    else {
                        collegePostdata.push({ post_ID: result.id, college_ID: x.college_ID })
                    }
                }
                const collegePostresults = await registerCollegePost({
                    obj: collegePostdata
                }, transaction)

                // register images
                const images = await registerPostImages(req.body.img_url, result.id, transaction)

                await transaction.commit()
                return res.json(result)
            }
            catch (err) {
                console.log("----------")
                // this error msg will be used for throwing the error from the catch block
                console.log(err)
                // console.log(err.errors[0].message)
                console.log("----------")
                await transaction.rollback()
                throw err
            }
        },

        searchPostById: async (req, res, next) => {
            const result = await postSearch()
        },

        getByBookId: async (req, res, next) => {
            //  get the books from the search and then get the post of the book id
            const bookKeyword = req.body.search
            const postSearchData = {
                limit: req.body.limit || 5,
                page: req.body.page || 1
            }
            if (bookKeyword) {
                // if bookID is not in request then find the book first then the post related to the book
                let bookData = {
                    keyword: bookKeyword,
                    limit: req.query.limit || 5,
                    page: req.query.page || 1,
                    columns: [
                        "id"
                    ]
                }
                const result = await bookSearch(bookData)
                postSearchData.book_ID = result.map((element) => {
                    return element.id
                })
            }
            else if (req.body.book_ID) {
                postSearchData.book_ID = req.body.book_ID
            }
            else {
                throw postErrors.keywordNotFound
            }
            const postsResult = await getPostByBookID(postSearchData)
            return res.json(generateResponse({
                msg: "post Found",
                result: {
                    // can add total posts option
                    posts: postsResult,
                    bookids: postSearchData.book_ID
                }
            }))
        },

        recommandedPost: async (req, res, next) => {
            const result = await recommandedPost({ limit: req.query.limit || 5, page: req.query.page || 1 })
            return res.json(generateResponse({ msg: "post found", result }))
        },

        getPostByUserId: async (req, res, next) => {
            const userid = req.session.userId
            const posts = await getPostByUserId(userid, {limit : req.query.limit, page : req.query.page})
            return res.json(generateResponse({msg : "post found", result : posts}))
        },
        
        getPostById : async (req, res, next) => {
            const postid = req.params.id
            const userid = req.session.userId
            const post = await getPostBooksById(postid)
            console.log(post, userid)
            if(userid == post[0].seller_ID){    
                return res.json(generateResponse({msg : "post found", result : post[0]}))
            }
            return res.status(403).json(generateResponse({msg : "Forbidden access"}))
        }

    }
}