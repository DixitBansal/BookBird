import React, { useReducer, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Container, Box, TextField, Typography, Button } from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
// apis
import { Userlogin } from '../../api/auth.api'
// actions
import { setUserData } from '../../reducer/userdata.reducer'
import { titleCase } from '../../utils/stringUtils';
import { useNavigate } from 'react-router-dom';

const initialCreds = {
  phone: "",
  password: "",
  ph_err: false,
  ph_err_msg: "",
  pw_err: false,
  acc_type: "user"
}

function credReducer(state, action) {
  switch (action.type) {
    case "SET_PHONE":
      let ph_err = false
      if (!/^\d+$/.test(action.payload)) {
        ph_err = true
        state = { ...state, ph_err, ph_err_msg: "*Cannot Contain Alphabets" }
      }
      else {
        state = { ...state, phone: action.payload, ph_err, ph_err_msg: "" }
      }
      return state
    case "SET_PASSWORD":
      let pw_err = false
      state = { ...state, password: action.payload, pw_err }
      return state
    case "RESET_CREDS":
      return initialCreds
  }
}

const Login = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [creds, setCreds] = useReducer(credReducer, initialCreds)
  const [showpopup, setShowpopup] = useState(false)
  const [serverityalert, setSeverity] = useState("error")
  const [alertMsg, setAlertMsg] = useState("")
  const [isLoggingIn, setIsLogginIn] = useState(false)

  async function handelLogin(event) {
    setIsLogginIn(true)
    // TODO : validations
    let response = await Userlogin(creds.phone, creds.password)
    if (response.success) {
      dispatch(setUserData(response.result))
      // navigate to home page
      navigate("/", { replace: true })
    }
    else {
      // show the error
      setSeverity("error")
      setAlertMsg(titleCase(response.msg))
      setShowpopup(true)
    }
    setIsLogginIn(false)
  }

  return (
    <Box>
      <Container sx={{
        display: " flex",
        justifyContent: "center",
        flexDirection: "column"
      }}>
        <Snackbar open={showpopup} autoHideDuration={6000} onClose={(event) => {
          setShowpopup(false)
        }} >
          <MuiAlert severity={serverityalert} variant='filled' onClose={(event) => {
            setShowpopup(false)
          }}>
            {alertMsg}
          </MuiAlert>
        </Snackbar>
        <form onSubmit={(event) => {
          event.preventDefault()
          handelLogin()
        }}>
          <Box sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column"
          }}>
            <TextField label="Phone Number" helperText={creds.ph_err_msg} error={creds.ph_err} onChange={(event) => {
              setCreds({ type: "SET_PHONE", payload: event.target.value })
            }} variant='standard' type='text' />
            <TextField label="Password" error={creds.pw_err} type='password' variant='standard' onChange={(event) => {
              setCreds({ type: "SET_PASSWORD", payload: event.target.value })
            }} />
          </Box>
          <LoadingButton loading={isLoggingIn} variant='contained' type='submit'>Login</LoadingButton>
        </form>
      </Container>
      <Container>
        <Typography>Forgot Password?</Typography>
        <Typography>Don't Have an Account? <Button variant='text'>Sign up</Button></Typography>
      </Container>
    </Box>
  )
}

export default Login