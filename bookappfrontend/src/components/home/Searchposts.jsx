import React, { useState, useRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from "react-router-dom";
import useLazyload2 from './useLazyload2';
// action
import { setDataAndPage } from '../../reducer/searchresult.reducer'; //current page for result
// api
import { fetchBookPosts } from '../../api/homepage.api'
// components
import Searchresult from "./Searchresult"
import { Box } from '@mui/material';
import { LoadingPosts } from "../LoadingPosts"

const Searchposts = () => {
    const dispatch = useDispatch()
    const location = useLocation()
    const targetRef = useRef(null)
    const [notFound, setNotFound] = useState(false)
    const searchResultData = useSelector(state => state.searchResultReducer)

    const callBackfunc = async (currentPage) => {

        const queryParameter = new URLSearchParams(location.search)

        const searchParam = queryParameter.get("search_query")
        let response = await fetchBookPosts(decodeURI(searchParam), { page: currentPage, limit: 2 }) // callBackProp({page: currentPage, limit: 2})
        if (currentPage === 1 && response.result.posts.length === 0) {
            setNotFound(true)
        }
        dispatch(setDataAndPage({ data: response.result.posts, currentPage: currentPage }))
        if (response.result.posts.length < 2) {
            return false
        }
        else {
            return true
        }

    }

    useEffect(() => {
        setNotFound(false)
    }, [location.search])

    const showLoading = useLazyload2(targetRef, {
        root: document,
        threshold: 0,
        // rootMargin: "300px"
    }, callBackfunc, [location.search])

    return (
        <Box className='my-14'>
            {
                notFound ?
                    <div>Not found!</div>
                    :
                    searchResultData.searchResultData.map((element, index) => {
                        return <Searchresult data={element} key={index} />
                    })
            }
            <div ref={targetRef} className={showLoading ? "visible" : "hidden"}>
                <LoadingPosts className={showLoading ? "visible" : "invisible"} />
            </div>
        </Box>
    )
}

export default Searchposts