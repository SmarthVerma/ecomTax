import React, { useEffect, useState } from 'react'
import ProductCard from '../ProductCard/ProductCard';
import { useSearchParams } from 'react-router-dom';
import { PaginationCN } from '../Pagination';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsForPage } from '@/store/slices/paginSlice';

function Featured() {

  const [queryParams, setQueryParams] = useSearchParams()
  const keyword = queryParams.get('keyword') || '';
  const [parms, setParms] = useState(keyword)
  const dispatch = useDispatch()
  const isLoading = useSelector(state => state.pagin.isLoading)
  const productData = useSelector(state => state.pagin.productData)

  useEffect(() => {
    setParms(keyword)
  }, [keyword])


  useEffect(() => {
    dispatch(fetchProductsForPage({ keyword: parms }))
  }, [parms])


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

      <div className='w-full  flex flex-col justify-center items-center p-4'>

     


          {isLoading ? (
          <div className="w-full text-center  ">
              <span className="loading loading-spinner loading-lg"></span>
            </div>
          ) : (
            <div className="min-h-full grid gap-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-center items-start">
              {productData.map((product, index) => (
                <div key={index} className="col-span-1">
                  <ProductCard className="ml-auto" data={product} />
                </div>
              ))}
            </div>
          )}
     

        <div className=' text-orange'>
          <PaginationCN />
        </div>
      </div>
    </div>
  )
}

export default Featured
