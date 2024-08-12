import React, { useState } from 'react'
import { RiArrowDropDownLine } from "react-icons/ri";
import AddressCard from './AddressCard';
import formatDate from "../../util/formatDateString";
import { Link } from 'react-router-dom';


const containerClass = 'w-full h-[244px] border rounded-2xl border-white bg-[#1a1717a7] overflow-y-hidden overflow-x-auto  border-opacity-35';
const detailHeaderClass = 'opacity-60 text-sm font-light uppercase';
const shipToUser = 'text-blue-300 font-medium  group-hover:underline cursor-pointer group-hover:text-red-400'
const dropIcon = 'text-2xl transform group-hover:rotate-0 transition-transform duration-200 rotate-90'

export default function OrderCard({ data, nav = true }) {
    const [show, setShow] = useState(nav)
    
    console.log(data)
    const { image, name, orderStatus, paidAt, price, shippingInfo, _id } = data
    const formatPaid = formatDate(paidAt)
    console.log({ data })


    return (
        <div className={`${containerClass} ${show ? '' : 'py-3 h-auto'}`} >
            {show && (
                <div className=' min-h-12 border-b w-[780px] lg:w-full px-2 flex justify-between border-white bg-[#3d3a3abd] border-opacity-35'>
                    <div className='flex basis-[370px] grow-0 shrink-0 justify-evenly '>
                        <div className='flex py-2 flex-col' >
                            <h3 className={detailHeaderClass}>order placed</h3>
                            <span className='font-light'>{formatPaid}</span>
                        </div>
                        <div className='flex py-2 flex-col' >
                            <h3 className={detailHeaderClass} >total</h3>
                            <span className='font-light'>₹ {price}</span>
                        </div>
                        <div className='flex py-2 flex-col' >
                            <h3 className={detailHeaderClass} >ship to</h3>
                            <div className='flex items-center group'>

                                <div className="dropdown dropdown-hover">
                                    <div tabIndex={0} role="button" className=" flex">
                                        <span className={shipToUser} >
                                            smarth
                                        </span>
                                        <RiArrowDropDownLine className={dropIcon} />
                                    </div>
                                    <div
                                        tabIndex={0}
                                        className="dropdown-content card card-compact m-0 bg-primary text-white z-[1] w-64 min-h-min p-2 shadow">
                                        <div className="card-body m-0 p-0 gap-0">
                                            <AddressCard details={shippingInfo} />
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='shrink-0 basis-[300px] px-4 border-red-50'>
                        <div className='flex py-2 flex-col ml-auto ' >
                            <h3 className={`${detailHeaderClass} flex items-center gap-2`}>
                                order <span className='text-[10px]'> # {_id}</span>
                            </h3>
                            <Link to={`/order-detail/${_id}`} className=' text-blue-400 cursor-pointer font-regular hover:underline'>
                                View Order Details
                            </Link>
                        </div>
                    </div>
                </div>
            )}
            <div className='px-10'>
                {/* delivered or not */}
                {orderStatus == "Processing" ? (<h1 className='text-xl text-[#edb047e9] cursor-default font-medium'>
                    {orderStatus}...
                </h1>) : (<h1 className='text-xl text-[#4dd028e9] cursor-default font-medium'>
                    {orderStatus}
                </h1>)}

                <div className='flex gap-x-4 mt-2'>
                    <div className='w-40 shrink-0'>
                        <img className='object-cover w-full ' src={image} alt="" />
                    </div>
                    <p className='text-lg grow shrink-0 font-thin lg:font-medium xl:font-bold basis-[10ch] line-clamp-4'>
                        {name}
                    </p>
                    <div className="divider before:bg-gray-500 after:bg-gray-500 divider-horizontal"></div>
                    <div className='basis-[14ch] m-auto shrink-0 text-[#f3eded] font-bold ml-auto flex flex-col gap-2 p-2'>
                        <button className='w-full rounded-xl bg-[#5e9aad] hover:bg-[#27657a]' >
                            Write a review
                        </button>
                        <button className='w-full rounded-xl bg-[#e44b4b] hover:bg-[#923c3c]' >
                            Cancel order
                        </button>

                    </div>
                </div>
            </div>
        </div>
    )
}
