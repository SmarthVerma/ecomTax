import React from 'react'
import './Loader.css'

function Loader() {
    return (
        <div className='min-h-screen w-full flex items-center gap-3 flex-col bg-black justify-center'>

            <p className='text-center text-5xl text-white font-medium ' >
                Loading...
            </p>
            <span className='loader'> </span>
        </div>
    )
}

export default Loader
