import axios from "axios";

export async function getMyposts({ page = 1, limit = 2 }) {
    const url = `/post/postbyuserid?limit=${limit}&page=${page}`
    const response = await axios({
        url,
        method: "get"
    })
    // if(status?)
    return response.data
}

export async function getMyPostById(postid) {
    const url = "/post/getbyid/" + postid
    const response = await axios({
        url,
        method: "get"
    })
    if (response.status === 403) throw new Error(response.data.msg)
    return response.data
}

export async function updatePost(postData) {
    const url = "/post/update"
    const requestData = {}
    console.log(postData)
    if (postData.images && postData.images.length !== 0) {
        requestData.images = postData.images
    }
    requestData.post = postData.post
    if (postData.college && Object.keys(postData.college).length !== 0) {
        requestData.college = postData.college
    }
    const response = await axios({
        url,
        method: "put",
        data: requestData
    })
    if (response.status === 403) throw new Error(response.data.msg)
    return response.data
}