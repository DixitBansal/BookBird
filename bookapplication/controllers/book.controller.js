import { bookSearch, bookRegister, getBookByID, getAllBooks, getBookByISBN, getBookByAttributes } from "../services/book.services.js"
// util function
import { generateResponse } from "../utils/response.utils.js"

export function bookControllers() {
    return {

        createBook: async (req, res, next) => {
            const data = {
                bookName: req.body.bookName,
                bookEdition: req.body.bookEdition,
                bookAuthor: JSON.stringify(req.body.bookAuthor),
                sellingPrice: req.body.sellingPrice,
                subject: req.body.subject,
                publication: req.body.publication,
                ISBN: req.body.ISBN
            }
            const result = await bookRegister(data)
            return res.json(generateResponse({ msg: "Book created successfully", result }))
        },

        searchBook: async (req, res, next) => {
            let result = null
            const keyword = req.query.search
            if (keyword.length >= 3) {
                result = await bookSearch({ keyword, columns: ["id", "bookName", "bookAuthor", "publication"], limit: req.query.limit || 5, page: req.query.page || 1 })
            }
            else {
                return res.json(generateResponse("keyword length must be greater than equal to 3", "error"))
            }
            return res.json(generateResponse({ msg: "book Found", result }))
        },

        getBookNames: async (req, res, next) => {
            const keyword = req.query.search
            let result = await bookSearch({ keyword, columns: ["bookName"], limit: req.query.limit || 5, page: req.query.page || 1 })
            console.log(result)
            return res.json(generateResponse({ msg: "Found book name list", result }))
        },

        getAllBooks: async (req, res, next) => {
            let data = {
                limit: req.query.limit,
                page: req.query.page
            }
            let result = await getAllBooks(data)
            return res.json(generateResponse({ msg: "books found", result }))
        },

        getbookId: async (req, res, next) => {
            let bookID = req.params.id
            const result = await getBookByID({ id: bookID })
            return res.json(generateResponse({ msg: "book found successfully", result }))
        },

        getBookByISBN: async (req, res, next) => {
            let ISBN = req.query.ISBN
            const result = await getBookByISBN(ISBN)
            return res.json(generateResponse({ msg: "book found successfully", result }))
        },

        getBookByAttr: async (req, res, next) => {
            let attribute = req.body.attribute
            let keyword = req.body.search
            let columns = req.body.columns || ["*"]
            const result = await getBookByAttributes(attribute, keyword, { columns, limit: req.query.limit, page: req.query.page })
            return res.json(generateResponse({ msg: "successfully found", result }))
        }
    }
}