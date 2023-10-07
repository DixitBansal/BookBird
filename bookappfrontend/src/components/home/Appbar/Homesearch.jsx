import React, { useEffect, useState } from 'react'
import { Box, Input } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
// apis
import { searchBook } from '../../../api/homepage.api';
import Homesearchoptions from './Homesearchoptions';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
// action
import { resetResultPosts } from '../../../reducer/searchresult.reducer';

const Homesearch = () => {

    const DEBOUNCE_TIMEOUT = 500 // 1 sec
    const MIN_LENGTH_WORD = 3 // 3 min letter to do a search
    const [options, setOptions] = useState([])
    const [showOptions, setShowOptions] = useState([])
    const [timeOutId, setTimeOutId] = useState(null)
    const [searchWord, setSearchWord] = useState("")
    const [showOptionMenu, setShowOptionMenu] = useState(false)

    const navigator = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        const keyHandler = (event) => {
            if (event.keyCode == 27) {
                setShowOptionMenu(false)
            }
        }

        window.addEventListener("keydown", keyHandler)

        return () => {
            window.removeEventListener("keydown", keyHandler)
            // window.removeEventListener("click", windowClickShowMenu)
            // document.getElementById("homesearchfield").removeEventListener("focus", onFocusShowOption)
        }
    }, [])

    const searchB = async () => {
        const x = document.getElementById("homesearchfield")
        const response = await searchBook(x.value, { page: 1, limit: 5 })
        // handel error
        setOptions((prev) => {
            if (response.result.length !== 0) {
                return response.result
            }
            return prev
        })
        setShowOptions(() => {
            return response.result
        })
        setTimeOutId(null)
    }

    function onClickHideHandel(event) {
        setShowOptionMenu(false)
        document.removeEventListener("click", onClickHideHandel)
    }

    async function handelInputChange(event) {
        setShowOptionMenu(true)
        document.addEventListener("click", onClickHideHandel)
        setSearchWord(event.target.value)
        if (event.target.value !== "") {
            setShowOptions([])
            const validOptions = options.filter((element) => {
                return element.bookName.toLowerCase().includes(event.target.value.toLowerCase().trim())
            })
            if (validOptions.length !== 0) {
                // add event listener
                setShowOptions(() => {
                    return validOptions
                })
            }
            else if (event.target.value.trim().length >= MIN_LENGTH_WORD) {
                // remove event listener
                if (timeOutId != null) {
                    clearTimeout(timeOutId)
                }
                const timeoutID = setTimeout(searchB, DEBOUNCE_TIMEOUT)
                setTimeOutId(timeoutID)
            }
        }
        else {
            // remove event listener
            setShowOptions([])
            setShowOptionMenu(false)
        }
    }

    function handelSearchSubmit(event, searchQuery) {
        event.preventDefault()
        dispatch(resetResultPosts())
        navigator(`/results/?search_query=${searchQuery}`)
    }

    return (
        <form onSubmit={(event) => (handelSearchSubmit(event, searchWord))} >
            <Box sx={{
                position: "relative"
            }}>
                <Box sx={{
                    display: "flex",
                    backgroundColor: 'rgba(255,255,255,0.15)',
                    borderRadius: "5px",
                    display: "flex",
                    alignItems: "center"
                }}>
                    <Box sx={{
                        marginLeft: "0.37rem",
                        marginRight: "0.38rem"
                    }}>
                        <SearchIcon />
                    </Box>
                    <Box>
                        <Input
                            autoComplete={"off"}
                            id="homesearchfield"
                            disableUnderline
                            sx={{
                                color: "white"
                            }}
                            value={searchWord}
                            placeholder='Name, Subject, Publication...'
                            onChange={(event) => {
                                handelInputChange(event)
                            }} />
                    </Box>
                </Box>
                {
                    showOptionMenu ?
                        <Box
                            sx={{
                                background: "white",
                                position: "absolute",
                                width: "100%",
                                top: "100%",
                                left: "0%",
                                color: "black",
                                borderRadius: "2px",
                                boxShadow: 3
                            }}>
                            {
                                showOptions.length !== 0 ? showOptions.map((element, index) => {
                                    return (
                                        <Homesearchoptions key={index} option={element} onClick={handelSearchSubmit} />
                                    )
                                }) : <p>Not Found</p>// image dalni hai
                            }
                        </Box> : null}
            </Box>
        </form>
    )
}

export default Homesearch