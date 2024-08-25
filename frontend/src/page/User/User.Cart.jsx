import React from 'react';
import findNavHeight from "../../util/findNavHeight";
import CartCard from '@/components/CartOrderCard/CartCard';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Cart() {
    const navHeight = findNavHeight();
    const cartItems = useSelector(state => state.cart.cartData);
    const totalCartItems = useSelector(state => state.cart.totalItems);

    return (

        <div className='flex max-md:flex-col-reverse items-start justify-center w-full gap-5'>
            <div
                className={`max-w-5xl bg-[#1a1717a7] overflow-y-auto rounded-xl py-7 text-white`}
                style={{
                    width: 'clamp(390px, 95%, 1800px)',
                    paddingLeft: 'clamp(0px, 2vw, 3rem)',
                    paddingRight: 'clamp(0px, 2vw, 3rem)',
                    marginTop: `${navHeight + 13}px`,
                    marginBottom: `${navHeight}px`,
                }}
            >
                <h1 className='text-4xl font-bold text-center text-yellow-300 opacity-75 font-kalam'>
                    Shopping Cart
                </h1>
                <p className='text-sm text-gray-400 font-thin text-center font-roboto'>
                    Total items in cart: {totalCartItems}
                </p>
                <div className="divider my-1 h-1 opacity-30 bg-slate-600"></div>
                <div className='space-y-3 my-3'>
                    {cartItems ? (
                        <>
                            {cartItems.map((item, i) => (
                                <CartCard key={i} data={item} />
                            ))}
                        </>
                    ) : (<>

                    </>)}

                </div>
            </div>

            <div
                className='w-72 h-auto  max-md:w-full  rounded-lg bg-[#363131a7] text-white'
                style={{
                    marginTop: `${navHeight + 13}px`,
                }}
            >
                <div className='rounded-xl shadow-lg p-5'>
                    <h2 className='text-2xl font-bold mb-3'>Order Summary</h2>
                    <div className='mb-3'>
                        <p className='text-lg font-semibold'>Total Cost: $</p>
                    </div>
                    <button
                        onClick={() => alert('Proceeding to checkout')}
                        className='w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition-colors'
                    >
                        <Link to={`/address`}>
                            Proceed to Buy
                        </Link>
                    </button>
                </div>
            </div>
        </div>
    );
}