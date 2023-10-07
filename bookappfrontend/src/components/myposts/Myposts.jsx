import React, { useState, useRef } from 'react'
// componensts
import { Box } from '@mui/material'
import Cardskeleton from '../components/skeletons/Cardskeleton'
import FavCards from '../favourites/FavCards'
import { Link } from 'react-router-dom'
// hook
import useLazyload2 from '../home/useLazyload2'
import { useDispatch, useSelector } from 'react-redux'
// apis
import { getMyposts } from '../../api/mypost.api'
// actions
import { addMypost } from '../../reducer/mypost.reducer'

const Myposts = () => {

  const triggerRef = useRef(null)
  const myposts = useSelector(state => state.mypostreducer)

  const dispatch = useDispatch()

  async function callBackFunc(currentPage) {
    // fetch the data and store the data in the Mypost reducer
    try {
      const LIMIT = 3
      const fetchedposts = await getMyposts({ limit: LIMIT, page: currentPage })
      if (fetchedposts.success) {
        dispatch(addMypost(fetchedposts.result))
      }
      console.log(fetchedposts.result)
      if (fetchedposts.result.length < LIMIT) {
        return false
      }
      return true
    }
    catch (err) {
      console.log(err)
      // TODO : show popups
    }
  }

  const showloading = useLazyload2(triggerRef, {
    root: document.getElementById("mypostcont"),
    threshold: 0,
    rootMargin: "300px"
  }, callBackFunc, [])

  return (
    <>
      <Box sx={{
        // position : "absolute", 
        // top : "3.5rem",
        // borderColor: "red",
        borderWidth: "1px",
        height: "80vh",
        overflow: "scroll"
      }} id={"mypostcont"}>
        <Box>
          {
            myposts.data.map((element, index) => {
              return (
                <Link to={"/edit-post/" + element.id} key={index}>
                  <FavCards key={index} data={element} showBookMark={false} />
                </Link>
              )
            })
          }
        </Box>
        <div ref={triggerRef} className={showloading ? "visible" : "hidden"}>
          <Cardskeleton />
        </div>
      </Box >
    </>
  )
}

export default Myposts