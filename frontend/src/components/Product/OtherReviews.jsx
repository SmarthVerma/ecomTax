import React from 'react'
import anonny from "../../assets/annony.png";
import ReactStars from 'react-stars'

export default function OtherReviews({ reviews }) {

    const options = {
        edit: false,
        isHalf: true,
        size: 22,
        activeColor: "#FAA41F"
    }

    console.log('this is a reviews', reviews)
    return (

        <>
            <div className=' flex flex-col items-center justify-center'>
                <h1 className='text-center text-4xl leading-tight font-bold font-kalam '>Reviews</h1>
                <hr className='w-[60%] p-3 opacity-50' />
            </div>
            <div className=' flex gap-2 justify-center overflow-x-auto'>
                {reviews?.map((rev, i) => (

                    <div key={i} className='max-h-80 w-80 pointer-events-none bg-slate-700 p-4 grow-0 shrink-0 overflow-auto rounded-md' >
                        <div className='flex items-end gap-4'>
                            <div className="avatar">
                                <div className="w-12 rounded-full">
                                    <img src={anonny} />
                                </div>
                            </div>
                            <span className='text-2xl font-medium font-roboto'> {rev?.name} </span>
                        </div>
                        <ReactStars id='raiing' {...options} value={rev?.rating} />
                        <div className="divider m-0"></div>
                        <div className='p4 font-kalam'>
                            {rev?.comment}
                        </div>
                    </div>

                ))}

            </div>
            <div className="divider"></div>
        </>
    )
}
