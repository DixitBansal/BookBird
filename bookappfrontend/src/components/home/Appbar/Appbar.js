import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import CircularProgress from '@mui/material/CircularProgress';
import LogoutIcon from '@mui/icons-material/Logout';
import Homesearch from "./Homesearch"
import { useOnlineStatus } from '../../useOnlineStatus';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// api
import { logoutUser } from "../../../api/auth.api.js"
// actions
import { resetUserData } from '../../../reducer/userdata.reducer';

export default function PrimarySearchAppBar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [isloggingOut, setIsLoggingOut] = React.useState(false)
  const navigator = useNavigate()
  const dispatch = useDispatch()
  const userData = useSelector(state => state.userdataReducer)

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();

  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  async function logout(event) {
    setIsLoggingOut(true)
    const response = await logoutUser()
    setIsLoggingOut(false)
    if (response.success) {
      // logout
      // empty all the user redux data and also the local storage if any
      handleMobileMenuClose()
      dispatch(resetUserData())
      navigator("/")
    }
    else {
      // TODO : alert
    }
  }

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem sx={{
        paddingY: "0",
        display: "flex",
        justifyContent: "center"
      }}
        onClick={() => {
          navigator("/profile")
        }} >
        <IconButton>
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
      <MenuItem sx={{
        paddingY: "0",
        display: "flex",
        justifyContent: "center",
      }}
        onClick={(event) => {
          logout(event)
        }}
      >
        <IconButton
          color='error'
          size='medium'
        >
          {
            isloggingOut ?
              <CircularProgress color='error' />
              :
              <LogoutIcon />
          }
        </IconButton>
        <Typography color={"error"}>Logout</Typography>
      </MenuItem>
    </Menu>
  );

  const onlineStatus = useOnlineStatus()

  return (
    <Box sx={{ flexGrow: 1, width: "100%", position: "fixed", top: "0", zIndex: "100" }} >
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
          >
            <Typography>LOGO</Typography>
          </IconButton>
          <Homesearch />
          <Box sx={{ flexGrow: 1 }} />
          {
            !userData.id ?
              userData.isReady ?
                <Button Button variant='text' sx={{
                  color: "white"
                }}
                  onClick={(event) => {
                    navigator("/auth")
                  }}
                >Login</Button>
                :
                null
              :
              <>
                <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                  <IconButton
                    size="large"
                    edge="end"
                    aria-label="account of current user"
                    aria-controls={menuId}
                    aria-haspopup="true"
                    onClick={handleProfileMenuOpen}
                    color="inherit"
                  >
                    <AccountCircle />
                  </IconButton>
                </Box>
                <Box sx={{ display: { display: 'flex', justifyContent: 'center', alignItems: "center" } }}>
                  <Box sx={{
                    width : "40px",
                    height : "40px",
                    marginLeft : "0.5rem",
                    borderRadius : "100%",
                    overflow : "hidden"
                  }}>
                    {userData.profileImgUrl ?
                      <img onClick={handleMobileMenuOpen} src={userData.profileImgUrl} className='w-full h-full object-cover' />
                      :
                      <IconButton
                        size="large"
                        aria-label="show more"
                        aria-controls={mobileMenuId}
                        aria-haspopup="true"
                        onClick={handleMobileMenuOpen}
                        color="inherit"
                      >
                        <AccountCircle />
                      </IconButton>}
                  </Box>
                </Box>
              </>
          }
        </Toolbar >
      </AppBar >
      {renderMobileMenu}
      {renderMenu}
    </Box >
  );
}
