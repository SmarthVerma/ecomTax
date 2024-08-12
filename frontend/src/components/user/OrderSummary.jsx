import React from 'react';
import AddressCard from './AddressCard';

function OrderSummary( {data} ) {

    const shippingInfo = data?.shippingInfo

    return (
        <div className='w-full border border-white border-opacity-40 rounded-md bg-[#3d3a3abd] h-[230px] p-5'>
            <div className='w-full flex  min-h-full'>
                <div className='basis-[260px] '>
                    <h2 className='font-bold my-1'>Shipping Address</h2>
                    <AddressCard details={shippingInfo}/>
                </div>
                <div className='basis-[30ch]  flex items-start justify-center '>
                    <div>
                        <h2 className='font-bold my-1'>Payment Methods</h2>
                        <span>BHIM</span>
                    </div>
                </div>
                <div className='grow  flex items-start justify-center border-lime-700'>
                    <div>
                        <h2 className='font-bold my-1'>Order Summary</h2>
                        <div className='grid grid-cols-2  p-2'>
                            <div className='col-span-1'>Item(s) Subtotal:</div>
                            <div className='col-span-1 text-right'>160.00</div>
                            <div className='col-span-1'>Shipping:</div>
                            <div className='col-span-1 text-right'>0.00</div>
                            <div className='col-span-1 font-bold'>Total:</div>
                            <div className='col-span-1 text-right font-bold'>160.00</div>
                            <div className='col-span-1'>Promotion Applied:</div>
                            <div className='col-span-1 text-right text-red-500'>- 8.00</div>
                        </div>
                        <div className="divider m-1 before:h-[1px] after:h-[1px] opacity-40 before:bg-gray-400 after:bg-gray-400 h-0"></div>
                        <div className='grid grid-cols-2'>
                            <div className=' font-bold'>Grand Total:</div>
                            <div className=' text-right font-bold'>152.00</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OrderSummary;