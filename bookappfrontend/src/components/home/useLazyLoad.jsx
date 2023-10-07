import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'

export const useLazyLoad = (initData, initCurrentPage, triggerRef, callBackfunc, options) => {
    const location = useLocation()

    // states
    const [showLoading, setShowLoading] = useState(true)
    const allowCalling = useRef(true)
    const [data, setData] = useState(initData)
    const currentPage = useRef(initCurrentPage)
    // states ended
    const handeledReq = useRef(false) // telling if the request is handeled or not - for multiple request generation at same time

    const _callBack = async () => {
        const data = await callBackfunc(currentPage.current)
        setData((prev) => {
            return [...prev, ...data]
        })

        if (data.length < 2) {
            allowCalling.current = false
            setShowLoading(false)
        }
        currentPage.current += 1

    }

    const onIntersect = async (entry) => {
        if (!handeledReq.current) {
            /**
             * if the the element has itersected the rect in
             * upward direction then set the handeledReq to  
             * true so that when the element go down or
             * re-intersect the element in downward direction
             * it will not be called
             */
            handeledReq.current = true
            if (allowCalling.current) {
                await _callBack()
            }
        }
        else {
            handeledReq.current = false
        }
    }

    if(initData.length === 0 && currentPage === 1){
        setData([])
        currentPage.current = 1
    }

    useEffect(() => {
        const observer = new IntersectionObserver(onIntersect, options)
        observer.observe(triggerRef.current)
        return () => {
            observer.disconnect()
        }
    })

    return { postData: data, showLoading: showLoading }
}
