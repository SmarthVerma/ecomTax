import React from 'react'

function Container({children}) {
  return (
    <div className='relative w-full min-h-max overflow-hidden '>
      {children}
    </div>
  )
}

export default Container
