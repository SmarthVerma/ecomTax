import React from 'react'
import { useParams } from 'react-router-dom'
import Discription from "../components/Product/Discription";
import ReviewSubmit from "../components/Product/ReviewSubmit";
import OtherReviews from "../components/Product/OtherReviews";

import dummy1 from '../assets/products/download.jpeg'
import dummy2 from '../assets/products/hpLaptop.png'
import { Crousal2 } from '@/components/Product/Crousal2';

const dummy = [dummy1, dummy2]


function Product() {
    const params = useParams()
    // const { isLoading, data } = useGetProduct(params.id)

    // console.log('SingleProduct data', data?.images)

    // if (isLoading) return (
    //     <div className='w-full min-h-screen flex items-center justify-center'>
    //         <span class="loading text-white loading-spinner loading-lg"></span>
    //     </div>
    // )

    return (
        <div className='w-full text-white min-h-screen flex flex-col p-4 py-32 px-4 md:px-16 xl:px-32 items-center justify-center relative'>
            <div className=' h-full flex flex-col lg:flex-row gap-3 xl:gap-20 relative'>
                <div className='grow-0 flex items-start justify-center  relative '>
                    <div className='sticky top-0 w-[456px] '>
                        <Crousal2 images={dummy} />
                    </div>

                </div>
                <div className=' grow text-center lg:text-start  '>
                    <Discription />

                </div>
            </div>

            <div className="divider"></div>

            <div className='py-4 w-full'>
                <ReviewSubmit />
            </div>

            <div className="divider"></div>

            <div className='w-full'>
                <OtherReviews />
            </div>
        </div>
    )
}

export default Product
