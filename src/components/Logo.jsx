import React from 'react'
import img from '../assets/imgblog.jpg'

function Logo({width = '100px'}) { // default width is 100px if no width is provided.
  return (
    <div>
      <img className={`w-20 h-15 rounded-full`} src={img} alt={"Logo"}/>
    </div>
  )
}

export default Logo