export async function randomPost({ page = 1, limit = 2 }) {
    let response = await fetch(`${process.env.REACT_APP_BASE_URL}/post?limit=${limit}&page=${page}`, {
        credentials: "include"
    })
    response = await response.json()
    return response
}

export async function fetchBookPosts(book_id, { page = 1, limit = 2 }) {

    if (book_id === null) {
        throw new Error("book id cannot be null")
    }

    const body = {
        page,
        limit,
        search: book_id
    }

    const request = new Request(`${process.env.REACT_APP_BASE_URL}/post/postbookid`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify(body)
    })
    let response = await fetch(request)
    response = await response.json()
    return response
}

export async function searchBook(searchWord, { page = 1, limit = 2 }) {
    let response = await fetch(`${process.env.REACT_APP_BASE_URL}/book/search?search=${searchWord}&limit=${limit}&page=${page}`, {
        credentials: "include"
    })
    response = await response.json()
    for (let x of response.result) {
        x.bookAuthor = JSON.parse(x.bookAuthor)
    }
    return response
}
