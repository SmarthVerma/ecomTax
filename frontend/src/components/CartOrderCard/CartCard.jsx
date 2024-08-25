import React from 'react';
import Quantity from './Quantity';
import { useDispatch } from 'react-redux';
import { deleteCartItem } from '@/store/slices/cartSlice';

export default function CartCard({ data }) {
  const amount = data?.amount
  const productId = data?.product._id
  const dispatch = useDispatch()

  const handleDeleteItem = () => {
    dispatch(deleteCartItem({ productId }))
  }

  return (
    <div className='cardCart cursor-pointer w-full h-auto flex gap-4 bg-gray-800 rounded-lg shadow-lg overflow-hidden'>
      {/* Product Image */}
      <div className='shrink-0 w-[21ch] border h-full border-r border-gray-700'>
        <img
          className=' h-full object-scale-down rounded-l-lg'
          src={data.product.images[0].url}
          alt={data?.product?.name || "Product image"}
        />
      </div>

      {/* Product Details */}
      <div className='flex-1 p-4 flex basis-[40ch] shrink-0 flex-col justify-between'>
        <div>
          <p className='font-bold text-lg text-gray-100'>
            {data?.product?.name}
          </p>
          <span className={`text-sm ${data?.product?.stock > 0 ? "text-green-300" : "text-red-300"}`}>
            {data?.product?.stock > 0 ? "In Stock" : "Out of Stock"}
          </span>
          <label htmlFor="checkbox" className='flex items-center gap-2 mt-2'>
            <input id='checkbox' type="checkbox" className="w-4 h-4 bg-gray-700" />
            <span className='text-gray-200 text-sm'>This will be a gift</span>
          </label>
        </div>
        <div className='flex items-start flex-col'>
          <Quantity amount={amount} />
          <button
            className='mt-2 text-xs text-red-500 hover:text-red-600 hover:underline'
            aria-label='Delete item'
            onClick={() => handleDeleteItem()}
          >
            Delete this
          </button>
        </div>
      </div>

      {/* Price Details */}
      <div className='shrink-0 w-[20ch] p-4 flex flex-col items-end bg-gray-700'>
        <p className='text-gray-300 text-sm'>Price</p>
        <p className='text-lg text-gray-100'>₹ <span className='font-semibold'>{data.product.price}</span></p>
        <div className='mt-auto mr-auto'>
          <p className='text-base text-gray-100'>
            Subtotal ({amount} items):
          </p>
          <span className='font-bold'>₹ {amount * (data.product.price)} </span>
        </div>
      </div>
    </div>
  );
}