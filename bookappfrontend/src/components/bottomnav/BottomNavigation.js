import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import AddIcon from '@mui/icons-material/Add';
import { Dialog } from '@mui/material';
import { Box } from '@mui/system';
import { Favorite } from '@mui/icons-material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { useLocation, useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import { useTheme } from '@emotion/react';
import TuneIcon from '@mui/icons-material/Tune';

import Filters from './Filters';

export default function LabelBottomNavigation() {
  const location = useLocation();
  // console.log(location.pathname);
  const theme = useTheme()
  const navigate = useNavigate();
  const [value, setValue] = React.useState(0);
  const [filteropen, setfilteropen] = React.useState(false)

  const Navigateto = (path) => {
    switch (path) {
      case "/":
        navigate("/", { preventScrollReset: true });
        break;
      case "/add-post":
        navigate("/addpost", { preventScrollReset: true });
        break;
      case "/favorites":
        navigate("/favorites", { preventScrollReset: true });
        break;
      case "/my-posts":
        navigate("/my-posts", { preventScrollReset: true });
        break;
      default:
        break;
    }
  }


  return (
    <>
      <Box sx={{
        zIndex: "100",
        position: "fixed",
        bottom: 0,
        width: "100%"
      }}>
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            if (newValue !== 3) {
              setValue(newValue);
            }
          }}
          sx={{
            display: "flex",
            justifyContent: "center",
            zIndex: "1000",
          }}
        >
          <BottomNavigationAction label="Home" icon={<HomeIcon />} onClick={() => Navigateto("/")} sx={{
            minWidth: "0"
          }} />
          <BottomNavigationAction label="Favorites" icon={<Favorite />} onClick={() => Navigateto("/favorites")} sx={{
            minWidth: "0"
          }} />
          <BottomNavigationAction label="Add" icon={<AddIcon />} onClick={() => Navigateto("/add-post")} sx={{
            minWidth: "0"
          }} />
          <BottomNavigationAction label="Filters" className='p-0' icon={<TuneIcon />} onClick={() => {
            // display the filter box
            setfilteropen(true)
          }} sx={{
            minWidth: "0"
          }} />
          <BottomNavigationAction label="Posts" icon={<DashboardIcon />} onClick={() => Navigateto("/my-posts")} sx={{
            minWidth: "0"
          }}
          />
        </BottomNavigation>
        <Dialog
          open={filteropen}
          onClose={(event) => {
            setfilteropen(false)
          }}
        >
          <Filters />
        </Dialog>
      </Box>
    </>
  );
}