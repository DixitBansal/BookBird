import React from 'react'
import { useDispatch, useSelector } from "react-redux"
import { Posts } from './Posts'
// action
import { setDataAndPage } from "../../reducer/home.reducer"
// api
import { randomPost } from '../../api/homepage.api'

const Homeposts = () => {

    const homeposts = useSelector(state => state.homePostReducer)
    const dispatch = useDispatch()

    const callBackfunc = async (currentPage) => {

        let response = null
        response = await randomPost({ page: currentPage, limit: 2 })
        dispatch(setDataAndPage({ data: response.result, currentPage: currentPage }))
        return response.result

    }
    // TODO : handel error when the client is not able to connect to the server
    return (
        <>
            <div id={"homeviewport"} className="container overflow-hidden ">
                <Posts callBackProp={callBackfunc} initdata={homeposts.postData} initCurrentPage={homeposts.currentPage + 1} />
            </div>
        </>
    )
}

export default Homeposts