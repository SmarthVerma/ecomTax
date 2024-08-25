import React from 'react'
import { LuShoppingCart } from "react-icons/lu";
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function CartOrders() {
    const totalCartItems = useSelector(state => state.cart.totalItems)
    return (
        <>
            <Link to={'/cart'}
                className='cursor-pointer hover:outline relative p-2  pt-3 flex items-center justify-center '
            >
                <h3 className='absolute text-shadow-lg cursor-default -top-1 left-3 text-md text-[#f3b735] font-medium p-1 text-center w-6'> {totalCartItems} </h3>
                <div className='flex items-end'>
                    <LuShoppingCart className='text-3xl' />
                    <span className='font-bold'>Cart</span>
                </div>
            </Link>
        </>
    )
}

export default CartOrders