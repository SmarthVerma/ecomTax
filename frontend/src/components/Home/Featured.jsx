import React, { useEffect, useState } from 'react'
import ProductCard from '../ProductCard/ProductCard';
import { useAllProducts } from '@/hooks/useAllProducts';
import { useSearchParams } from 'react-router-dom';

function Featured() {

  const [queryParams, setQueryParams] = useSearchParams()
  const keyword = queryParams.get('keyword') || '';
  const [parms, setParms] = useState(keyword)

  useEffect(() => {
    setParms(keyword)
  }, [keyword])


  const { isLoading, data } = useAllProducts({ keyword: parms })
  // console.log('yes xxxxxxthis is params', parms)
  // console.log('Yes xxxxx this is keyword', keyword)

  // console.log({ data })



  return (
    <div id='feature' className='min-h-screen text-white bg-slate font-Roboto m-0 p-6'>
      <div className='text-center'>
        <h1 className='text-3xl sm:text-6xl font-bold font-kalam text-orange-500'>FEATURED PRODUCTS</h1>
        <div className='flex justify-center'>
          <hr className='block mt-4 mb-2 w-full xl:w-[50%] ' />
        </div>
      </div>
      {keyword && (
        <p className='text-2xl text-center text-gray-300 font-medium'>Showing results for {' '}
          <span className='text-white font-bold text-3xl underline'>
            {keyword}
          </span>
        </p>
      )}

      <div className='w-full flex justify-center items-center p-4'>
        <div className="min-h-full grid m-auto gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 justify-center items-start">
          {isLoading ? (
            <div className='w-full text-center '>
              <span className="loading loading-spinner loading-lg"></span>
            </div>
          ) : (
            data.products.map((product, index) => (
              <div key={index} className="col-span-1">
                <ProductCard className="ml-auto" data={product} />
              </div>
            ))
          )}

        </div>
      </div>
    </div>
  )
}

export default Featured
