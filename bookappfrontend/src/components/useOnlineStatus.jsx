import { useState, useEffect } from "react"

export function useOnlineStatus() {
    const [onlineStatus, setOnlineStatus] = useState(navigator.onLine)


    useEffect(() => {
        const handleOnline = (event) => {
            setOnlineStatus(true)
        }

        const handelOffline = (event) => {
            setOnlineStatus(false)
        }

        window.addEventListener('online', handleOnline)

        window.addEventListener('offline', handelOffline)
        return () => {
            window.removeEventListener('online', handleOnline)
            window.removeEventListener('offline', handelOffline)
        }
    }, [])

    return onlineStatus

}