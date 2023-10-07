export function paginateQuery(queryString, limit, page){
    const offset = (page - 1) * limit
    queryString += ` LIMIT ${limit} OFFSET ${offset}`
    return queryString
}