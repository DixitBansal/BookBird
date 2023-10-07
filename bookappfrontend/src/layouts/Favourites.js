import React from 'react'
import FavCards from '../components/favourites/FavCards.jsx'
import { Box } from '@mui/material'
import { useSelector } from 'react-redux'

export default function Favorites() {

  const homeposts = useSelector(state => state.homePostReducer)

  return (
    <>
      <div className='text-center  text-xl p-4 font-bold text-white bg-blue-500'>Posts You Have Liked</div>
      <Box sx={{ marginTop: "0.5rem" }}>
        <FavCards 
          data = {homeposts.postData[0]}
          showBookMark={true}
        />
      </Box>
    </>

  )
}
