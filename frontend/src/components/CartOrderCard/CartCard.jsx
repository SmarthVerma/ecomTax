import React from 'react'
import './CartCard.css'

export default function CartCard() {
  return (
    <div className='cardCart cursor-pointer w-full h-52 flex gap-3 bg-stone-800 rounded-xl'>

      <div className='h-full basis-[21ch] shrink-0 border w-56 overflow-clip'>
        <img
          className='w-full aspect-square object-cover'
          src="https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/63c77c04dc6448548ccbae880189e107_9366/Galaxy_6_Shoes_Black_GW3848_01_standard.jpg"
          alt=""
        />
      </div>

      <div className='flex basis-[40ch] grow overflow-hidden p-2 flex-col'>
        <p className='font-bold text-2xl truncate'>
          Prod1 jioqdi jaisdj ioasj doias d idhasid ha
        </p>
        <span className='font-regular text-green-400'>
          in Stock
        </span>
        <label htmlFor="checkbox" className='flex items-center gap-2'>
          <input id='checkbox' type="checkbox" defaultChecked className="checkbox w-4 h-4 bg-slate-300" />
          This will be a gift
        </label>
        <div className='text-lg'>
          <p className='text-red-700'>Quantity: <span className='text-gray-200'>4</span></p>
          <button className='text-sm text-blue-300 cursor-pointer hover:underline hover:text-blue-400'> Delete this </button>
        </div>
      </div>
      <div className="divider divider-horizontal"></div>
      <div className='basis-[200px] shrink-0 grow p-2 flex flex-col items-end '>
        <p className=''>Price</p>
        <p>₹ <span>123</span></p>
        <div className='mt-auto ml-auto'>
          <p className='text-lg'>
            Subtotal (4 items): <span className='font-bold'>₹300.00</span>
          </p>
        </div>
      </div>
    </div>
  )
}