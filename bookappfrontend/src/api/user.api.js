import axios from "axios"

export async function getUserProfile() {
    const req = new Request(`${process.env.REACT_APP_BASE_URL}/user/profile`, {
        credentials: "include"
    })

    let response = await fetch(req)
    response = await response.json()

    return response

}

export async function updateUserProfile(updateData) {
    const res = await axios({
        method: "put",
        url: "/user/update",
        data: updateData
    })
    return res.data
}

export async function uploadImgToPresignedUrl(url, file) {
    /**
     * @param url url to which the image is to be uploaded
     * @param file file that is to be uploaded
     * @return access url of the image
     */
    try{

        const response = await axios({
            method: "put",
            url: url,
            withCredentials: false,
            data: file,
            headers : {
                "Content-Type" : "image/jpg"
            }
        })
        return url.split("?")[0]
    }
    catch(err){
        console.log(err)
        return null
    }
}

/**
 * apply throw in the api on bases of status code 
 * set the status code at tha backend response
 * apply try catch at the calling of the api so
 * that error can be handled
 */