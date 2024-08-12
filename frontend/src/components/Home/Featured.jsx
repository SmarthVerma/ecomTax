import React from 'react'
import ProductCard from '../ProductCard/ProductCard';
import { useSelector } from 'react-redux';

function Featured() {
  const products = useSelector(state => state.product.products)


  return (
    <div id='feature' className='min-h-screen text-white bg-slate font-Roboto m-0 p-6'>
      <div className='text-center'>
        <h1 className='text-3xl sm:text-6xl font-bold'>FEATURED PRODUCTS</h1>
        <div className='flex justify-center'>
          <hr className='block mt-4 mb-2 w-full xl:w-[50%] ' />
        </div>
      </div>
      <div className='w-full flex justify-center items-center p-4'>

        <div className="min-h-full grid m-auto gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 justify-center items-start">
          {products.map((product, index) => (
            <div key={index} className="col-span-1">
              <ProductCard className="ml-auto" data={product} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Featured
