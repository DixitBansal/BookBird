import { Typography, Box, Button } from '@mui/material'
import React, { useEffect, useState, useReducer } from 'react'
import PostDetails from './Postdetails'
import Postthumbnils from './Postthumbnils'
import { useTheme } from '@mui/material'
import { useParams } from 'react-router-dom'
// components
import PostDetailSkeletons from "../components/skeletons/PostDetailSkeletons"
import Postprice from './Postprice'
import Postcollege from './Postcollege'
import Postsoldstatus from "./Postsoldstatus"
// api
import { getMyPostById, updatePost as updateMypost } from "../../api/mypost.api.js"
import { deletePresignedUrl, getPresignedUrl } from "../../api/addpost.api.js"
import { uploadImgToPresignedUrl } from "../../api/user.api.js"
// actions

function editedPostReducer(state, action) {
  switch (action.type) {
    case "SET_POST_DATA": {
      const { id, seller_ID, post_date, book_ID, soldStatus, isNegotiable, postDescription, isVerified, accessibility, sellingPrice, createdAt, updatedAt, img_urls, collegeName, city, pincode, college_ID } = action.payload
      state = {
        ...state, id, seller_ID, post_date, book_ID, soldStatus, isNegotiable, postDescription, isVerified, accessibility, sellingPrice, createdAt, updatedAt, img_urls, college: {
          collegeName, city, pincode, college_ID
        }
      }
      return state
    }
    case "UNSET_POST_DATA": {
      state = null
      return state
    }
    case "UPDATE_POST_DATA": {
      state = { ...state, ...action.payload }
      return state
    }
    case "SET_FRONT_PAGE": {
      state = { ...state, images: { ...state.images, frontPage: action.payload } }
      return state
    }
    case "SET_BACK_PAGE": {
      state = { ...state, images: { ...state.images, backPage: action.payload } }
      return state
    }
    case "UPDATE_POST_SELLING_PRICE": {
      state = { ...state, sellingPrice: action.payload }
      return state
    }
    case "UPDATE_POST_COLLEGE": {
      const { collegeName, city, id, pincode } = action.payload
      state = { ...state, college: { collegeName, city, college_ID: id, pincode } }
      return state
    }
    default:
      return state
  }
}

const EditPost = () => {

  const theme = useTheme()
  const params = useParams()

  const [originalPostData, setOriginalPostData] = useState({})
  const [postData, postDataDispatch] = useReducer(editedPostReducer, {
    images: {
      frontPage: null,
      backPage: null
    }
  })

  useEffect(() => {
    const fetchPost = async () => {
      try {
        if (!params.id) {
          throw new Error("IdUndefined")
        }
        const post = await getMyPostById(params.id)
        setOriginalPostData(post.result)
        postDataDispatch({ type: "SET_POST_DATA", payload: post.result })
      }
      catch (err) {
        console.log(err)
        // TODO : popup
      }
    }
    fetchPost()
  }, [])

  async function updatePost(event) {
    // event.preventDefault()
    try {
      const requestData = {
        images: [],
        post: {},
        college: {}
      }
      // check, delete and upload images
      console.log(postData.images.frontPage, postData.images.backPage)
      if (postData.images.frontPage) {
        await deletePresignedUrl(originalPostData.img_urls.split(',')[0])
        let frontPresignedUrl = await getPresignedUrl({ fileFormat: "image/jpg", type: "post" })
        frontPresignedUrl = frontPresignedUrl.data.result
        const frontpageurl = await uploadImgToPresignedUrl(frontPresignedUrl, postData.images.frontPage)
        postDataDispatch({type : "SET_FRONT_PAGE", frontPage : frontpageurl})
        requestData.images.push({ url: frontpageurl, imageFor: "frontpage" })
      }
      
      if (postData.images.backPage) {
        await deletePresignedUrl(originalPostData.img_urls.split(',')[1])
        let backPresignedUrl = await getPresignedUrl({ fileFormat: "image/jpg", type: "post" })
        backPresignedUrl = backPresignedUrl.data.result
        const backpageurl = await uploadImgToPresignedUrl(backPresignedUrl, postData.images.frontPage)
        postDataDispatch({type : "SET_BACK_PAGE", backPage : backpageurl})
        requestData.images.push({ url: backpageurl, imageFor: "backpage" })
      }

      // post data
      for (let x in postData) {
        if (x !== "images" && x !== "college") {
          requestData.post[x] = postData[x]
        }
      }
      // update college
      if (postData.college.college_ID !== originalPostData.college_ID) {
        requestData.college = { ...postData.college, old_college_id: originalPostData.college_ID }
      }
      console.log(requestData)
      const res = await updateMypost(requestData)
    }
    catch (err) {
      console.log(err)
      // TODO: show error popup
    }
  }

  return (
    <Box>
      {
        postData.id ?
          <form>
            <Box sx={{
              padding: "1rem",
              overflow: "scroll",
              height: "80vh"
            }}>
              <Box sx={{
                display: "flex",
                justifyContent: "space-between"
              }}>
                <Typography fontSize={28} fontWeight={700} sx={{
                  marginBottom: "1rem",
                }} color={theme.palette.fontcolor.heading}>
                  Post Details
                </Typography>
                <Typography textAlign={"right"} color={theme.palette.fontcolor.heading}>
                  <span className={'bold'}>
                    Published Date
                  </span>
                  <br />
                  {new Date(postData.post_date).toLocaleString()}
                </Typography>
              </Box>
              <PostDetails description={postData.postDescription} onChange={(event) => {
                postDataDispatch({ type: "UPDATE_POST_DATA", payload: { postDescription: event.target.value } })
              }}
                accessiblityOnChange={(event) => {
                  postDataDispatch({ type: "UPDATE_POST_DATA", payload: { accessibility: event.target.value } })
                }}
                accessiblity={postData.accessibility}
              />
              <Postthumbnils
                imgs={postData.img_urls.split(',')}
                setFrontPage={(file) => {
                  postDataDispatch({ type: "SET_FRONT_PAGE", payload: file })
                }}
                setBackPage={(file) => {
                  postDataDispatch({ type: "SET_BACK_PAGE", payload: file })
                }}
              >
              </Postthumbnils>
              <Postprice
                sellingPrice={postData.sellingPrice}
                isNegotiable={postData.isNegotiable}
                isNegotiableChangeHandel={(event) => {
                  postDataDispatch({ type: "UPDATE_POST_DATA", payload: { isNegotiable: Number(event.target.checked) } })
                }}
                priceChangeHandler={(event, isnumber) => {
                  if (isnumber) {
                    postDataDispatch({ type: "UPDATE_POST_SELLING_PRICE", payload: event.target.value })
                  }
                }}
              />
              <Postcollege onChange={(event, value) => {
                postDataDispatch({ type: "UPDATE_POST_COLLEGE", payload: value })
              }}
                collegeName={postData.college.collegeName}
              />
              <Postsoldstatus value={postData.soldStatus} onChange={(event, value) => {
                postDataDispatch({ type: "UPDATE_POST_DATA", payload: { soldStatus: Number(value) } })
              }} />
              <Box sx={{
                display: "flex",
                columnGap: "1rem",
                justifyContent: "flex-end",
                marginTop: "1rem"
              }}>
                <Button variant='outlined'>
                  Undo Changes
                </Button>
                <Button variant='contained' onClick={updatePost} >
                  Save
                </Button>
              </Box>
            </Box>
          </form>
          :
          <PostDetailSkeletons />
      }
    </Box >
  )
}

export default EditPost