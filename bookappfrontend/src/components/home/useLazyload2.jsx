import { useEffect, useRef, useState } from 'react'

const useLazyload2 = (target, options, callBackfunc, query) => {

/**
 * callBackfunc : 
 *      @param int - currentpage - page to fetch the data
 *      @returns boolean - showing if there is a need of further fetching or not
 */

    if (!query instanceof Array) {
        throw new Error("Query Must be an Array")
    }


    const currentPage = useRef(1)
    const stopCalling = useRef(false)
    const isIntersected = useRef(true)
    const result = useRef(true)
    const [resultState, setResultState] = useState(true)

    async function onIntersect(entries) {
        // console.log(entries) 
        if (!stopCalling.current && isIntersected.current && entries[0].isIntersecting) {
            result.current = await callBackfunc(currentPage.current)
            setResultState(result.current)
            currentPage.current += 1
            isIntersected.current = false
            if (!result.current) {
                stopCalling.current = true
            }
        }
        else {
            isIntersected.current = true
        }
    }

    useEffect(() => {
        currentPage.current = 1
        stopCalling.current = false
        isIntersected.current = true
        result.current = false
        setResultState(true)
        console.log("connecting....")
        const observer = new IntersectionObserver(onIntersect, options)
        observer.observe(target.current)

        return () => {
            console.log("disconnecting")
            observer.disconnect()
        }
    }, [...query])
    return resultState

}

export default useLazyload2