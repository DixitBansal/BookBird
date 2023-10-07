import React, { useEffect, useState, useReducer } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
// components
import { Box } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Profileheader from "./Profileheader.jsx"
import ProfileimgUpload from './ProfileimgUpload.jsx';
import Profiledata from './Profiledata.jsx';
import ProfileuploadimgModel from './ProfileuploadimgModel.jsx';
// api
import { logoutUser } from '../../../api/auth.api';
import { updateUserProfile, uploadImgToPresignedUrl } from '../../../api/user.api.js';
import { deletePresignedUrl } from '../../../api/addpost.api.js';
// actions
import { resetUserData, updateUserData } from '../../../reducer/userdata.reducer.js';
import { getPresignedUrl } from '../../../api/addpost.api.js';


function userProfileDataReducer(state, action) {
  switch (action.type) {
    case "SET_USERNAME":
      state = { ...state, userNames: action.payload }
      return state

    case "SET_EMAIL":
      state = { ...state, email: action.payload }
      return state

    case "SET_CONTACT":
      state = { ...state, contacts: action.payload }
      return state

    case "SET_GENDER":
      state = { ...state, gender: action.payload }
      return state

    case "SET_PROFILE_IMG_URL":
      state = { ...state, profileImgUrl: action.payload }
      return state

    case "SET_DATA":
      state = { ...action.payload }
      return state

    case "SET_UPLOAD_FILE":
      state = { ...state, uploadFile: action.payload }
      return state

    case "SET_UPLOAD_FILE_DUMMY_URL":
      state = { ...state, uploadFileUrl: action.payload }
      return state

    case "UNSET_UPLOAD_FILE":
      URL.revokeObjectURL(state.uploadFileUrl)
      state = { ...state, uploadFileUrl: null, uploadFile: null }
      return state

    default:
      return state

  }
}

const Profile = () => {

  const userdata = useSelector(state => state.userdataReducer)
  const [profileData, profileDispatch] = useReducer(userProfileDataReducer, {
    userNames: "",
    email: "",
    gender: "",
    contacts: "",
    profileImgUrl: "",
    uploadFile: null,
    uploadFileUrl: null
  })

  const [readyToShow, setReadyToshow] = useState(false)
  const [showLogoutLoading, setShowLogoutLoading] = useState(false)
  const [showPostUpdateLoading, setShowPostUpdateLoading] = useState(false)
  const [enableEdit, setEnableEdit] = useState(true)
  const [showImgModel, setShowImgModel] = useState(false)
  const [uploadBtnLod, setUploadBtnLod] = useState(false)

  const navigator = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    if (userdata.isReady && !userdata.id) {
      navigator("/", { replace: true })
    }
    if (userdata.isReady && userdata.id) {
      setReadyToshow(true)
      const payload = {
        userNames: "",
        email: "",
        gender: "",
        contacts: "",
        profileImgUrl: ""
      }
      for (let x in payload) {
        payload[x] = userdata[x]
      }
      profileDispatch({ type: "SET_DATA", payload })
    }
  }, [userdata])

  async function handelLogout(event) {
    setShowLogoutLoading(true)
    const data = await logoutUser()
    setShowLogoutLoading(false)
    if (data.success) {
      dispatch(resetUserData())
      navigator("/")
    }
    else {
      // TODO handel alert popup
    }
  }

  async function handelProfileEdit() {
    // TODO
    setShowPostUpdateLoading(true)
    const response = await updateUserProfile(profileData)
    if (response.success) {
      // update the userdata reducer
      dispatch(updateUserData(profileData))
    }
    else {
      // TODO : show alert popup
    }
    setShowPostUpdateLoading(false)
  }

  function navigateBackHandler() {
    // TODO
    navigator(-1)
  }

  function enableEditing() {
    setEnableEdit(!enableEdit)
  }

  function showImageModel(event) {
    /**
     * firstly check if the type of the image file
     */
    // create url of the upload image also store the image file and url in the reducer
    const file = event.target.files[0]
    if (file.type === "image/jpeg" || file.type === "image/png") {
      const url = URL.createObjectURL(file)
      profileDispatch({ type: "SET_UPLOAD_FILE", payload: file })
      profileDispatch({ type: "SET_UPLOAD_FILE_DUMMY_URL", payload: url })
      setShowImgModel(!showImgModel)
    }
    else {
      //TODO :popup wrong image format
      console.log("wrong image format")
    }
  }

  function closeImgModel() {
    // delete the dummy url and clear the profile data of file and url
    setShowImgModel(!showImgModel)
    URL.revokeObjectURL(profileData.uploadFileUrl)
    profileDispatch({ type: "UNSET_UPLOAD_FILE" })
  }

  async function changeProfileImg(event) {
    // TODO handel Error
    /**
     * called from the modal and upload the
     * delete the existing profile image
     * get the presigned url and then upload the image to the s3 bucket
     * upload the new image
     * update the profile image in backend
    */
    try {
      setUploadBtnLod(true)
      let deleteRes = null
      if (userdata.profileImgUrl) {
        deleteRes = (await deletePresignedUrl(userdata.profileImgUrl)).data
      }
      const { data } = await getPresignedUrl({ fileFormat: "jpg", type: "post" })
      const url = data.result
      const imgurl = await uploadImgToPresignedUrl(url, profileData.uploadFile)
      const updateProfileRes = await updateUserProfile({ profileImgUrl: imgurl })
      profileDispatch({ type: "SET_PROFILE_IMG_URL", payload: imgurl })
      dispatch(updateUserData({ profileImgUrl: imgurl }))
      // show TODO : success popup
      setUploadBtnLod(false)
      closeImgModel()
    }
    catch (err) {
      console.log(err)
      // TODO alert popup for error
    }
  }

  return (
    <>
      {
        !readyToShow ?
          <Box
            sx={{
              "display": 'flex',
              "width": "100vw",
              "height": "100vh",
              "alignItems": "center",
              "justifyContent": "center"
            }}>
            <CircularProgress />
          </Box>
          :
          <>
            <Box sx={{
              height: "100vh",
              width: "100vw"
            }}>
              <Box sx={{
                position: "sticky",
                top: "0",
                width: "100%",
                zIndex: "100"
              }}>
                <Profileheader enableEditing={enableEditing} navigateBackHandler={navigateBackHandler} />
              </Box>
              <Box sx={{
                height: "80%",
                overflow: "scroll"
              }}>
                <ProfileimgUpload data={profileData} showImageModel={showImageModel} />
                <Profiledata
                  profileData={profileData}
                  profileDispatch={profileDispatch}
                  handelLogout={handelLogout}
                  handelUpdateProfile={handelProfileEdit}
                  showLogoutLoading={showLogoutLoading}
                  showPostUpdateLoading={showPostUpdateLoading}
                  enableEdit={enableEdit}
                />
                <ProfileuploadimgModel
                  imgUrl={profileData.uploadFileUrl}
                  showImgModel={showImgModel}
                  changeProfileImg={changeProfileImg}
                  toggelImgModel={closeImgModel}
                  uploadBtnLod={uploadBtnLod}
                />
              </Box>
            </Box>
          </>
      }
    </>
  )
}

export default Profile