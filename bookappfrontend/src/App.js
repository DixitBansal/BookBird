import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import "./App.css";
// layouts
import AuthLayout from "./layouts/AuthLayout";
import MainLayout from "./layouts/MainLayout";
import Home from "./layouts/Home.js"
import AddPost from "./layouts/AddPost.js";
import Favorites from "./layouts/Favourites.js";
// components
import Postdescription from "./components/postdescription/Postdescription"
import Homeposts from "./components/home/Homeposts";
import Searchposts from "./components/home/Searchposts";
import Login from "./components/auth/Login";
import Profile from "./components/auth/profile/Profilepage";
import Myposts from "./components/myposts/Myposts";
import EditPost from "./components/editpost/EditPost";
// actions
import { setUserData } from "./reducer/userdata.reducer";
// api
import { getUserProfile } from "./api/user.api";

function App() {

  const dispatch = useDispatch()

  const theme = createTheme({
    palette: {
      primary: {
        main: "#397ADC",
        text: "#000000"
      },
      secondary: {
        main: "#F3FCFF",
        text: "#666666",
        darkHeading: "#474747",
        lightDark: "#f1f1f1"
      },
      bg: {
        main: "#DDEBFF"
      },
      danger: {
        main: "#e82020"

      },
      fontcolor : {
        subheading : "#9A9A9A",
        fieldLable : "#7F8283",
        fieldLableDark : "#474A4B",
        heading : "#676769",
        headingDescription : "#7F8283"
      }
    },
    typography: {
      bookHeading: 700,
      subHeadingWeight: 500,
      subHeadingSize: "1rem"
    }
  })

  const routes = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          path: "",
          element: <Home />,
          children: [
            {
              path: "",
              element: <Homeposts />
            }, {
              path: "results",
              element: <Searchposts />
            },
            {
              path: "details/:id",
              element: <Postdescription />
            },
            {
              path: "my-posts",
              element: <Myposts />
            },
            {
              path: "edit-post/:id",
              element: <EditPost />
            }
          ]
        },
        {
          path: "addpost",
          element: <AddPost />
        },
        {
          path: "favorites",
          element: <Favorites />
        },
        {
          path: "profile",
          element: <Profile />
        }
      ]
    },
    {
      path: "auth",
      element: <AuthLayout />,
      children: [
        {
          path: "",
          element: <Login />
        }
      ]
    }
  ])

  useEffect(() => {
    const profileFetcher = async () => {
      try {
        let response = await getUserProfile()
        dispatch(setUserData(response.result))
      } catch (err) {
        console.log(err)
        // TODO: popup
      }
    }
    profileFetcher()
  }, [])

  return (
    <>
      <ThemeProvider theme={theme}>
        <RouterProvider router={routes}>
        </RouterProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
