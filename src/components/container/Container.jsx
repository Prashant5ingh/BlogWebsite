import React from 'react'

function Container({children}) { // accepts properties as children. "children" is a name or string that we can change to anything. 
  return ( // container is between header and footer. We define style properties here. 
    <div className='w-full max-w-7xl mx-auto px-4'>
        {children}
        </div>
  )
}

export default Container