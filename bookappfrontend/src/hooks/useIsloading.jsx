import React, { useEffect, useState } from 'react'

export const useIsloading = (data) => {

  const [isloading, setIsloading] = useState(true)

  useEffect(() => {
    if(isloading){
      setIsloading(false)
    }
    else{
      setIsloading(true)
    }
  }, [data])

  return isloading
}
