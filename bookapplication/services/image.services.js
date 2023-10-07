import { createOptions } from "../utils/basic.utils.js";
import { PostImageModel } from "../db/models/media.model.js"

export async function registerPostImages(data, postID, transaction = null) {
    const options = createOptions(transaction)
    let images = []
    for (let x in data) {
        let img = {
            postId: postID,
            imageUrl: data[x],
            mimeType: data.mineType
        }
        images.push(img)
    }
    const result = await PostImageModel.bulkCreate(images, options)
    return result
}