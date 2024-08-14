import React from 'react';
import findNavHeight from "../../util/findNavHeight";

import CartCard from '@/components/CartOrderCard/CartCard';
import { Link } from 'react-router-dom';

export default function Cart() {
    const navHeight = findNavHeight();
    return (
      
            <div className='w-full gap-5 flex items-start justify-center'>
                <div
                    className={`max-w-5xl bg-[#1a1717a7] overflow-y-scroll shrink-0 rounded-xl py-7 text-white`}
                    style={{
                        width: 'clamp(390px, 95%, 1800px)', // Adjusted minimum width
                        paddingLeft: 'clamp(0px, 2vw, 3rem)', // Adjusted minimum padding
                        paddingRight: 'clamp(0px, 2vw, 3rem)',
                        marginTop: `${navHeight}px`,
                        marginBottom: `${navHeight}px`,
                    }}
                >
                    <h1 className='text-4xl font-bold opacity-75 font-kalam text-yellow-400'>
                        Shopping Cart
                    </h1>
                    <p className='text-sm text-gray font-thin font-roboto'>Total items in cart 3</p>
                    <div className="divider my-1 h-1 opacity-30 after:bg-slate-600 before:bg-slate-600"></div>
                    <div className='space-y-3 my-3'>
                        <CartCard />
                        <CartCard />
                        <CartCard />
                        <CartCard />
                        <CartCard />
                    </div>
                </div>
                <div
                className='w-72 h-32 rounded-lg text-white bg-[#363131a7]'
                    style={{
                        marginTop: `${navHeight}px`,
                        marginBottom: `${navHeight}px`,
                    }}
                >
                    <div className=' rounded-xl  shadow-lg p-5'>
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