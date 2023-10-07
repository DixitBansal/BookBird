import React from 'react'
import Cards from './Cards'

const Searchresult = ({ data }) => {
  return (
    <div className="m-auto w-full">
      <Cards data={data} />
    </div>
  )
}

export default Searchresult