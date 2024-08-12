import React from 'react';
import OrderCard from '../../components/user/OrderCard';
import findNavHeight from '@/util/findNavHeight';
import { useGetMyOrders } from '@/hooks/useGetMyOrders';


export default function MyOrders() {
    const navHeight = findNavHeight()
    const { isLoading, data: orderList } = useGetMyOrders()
    console.log(orderList)


    return (
        <div className='max-h-screen w-full flex justify-center'>
            <div
                className=' max-w-4xl overflow-y-scroll  shrink-0 py-7 text-white'
                style={{
                    width: 'clamp(390px, 80%, 1800px)', // Adjusted minimum width
                    paddingLeft: 'clamp(0px, 2vw, 3rem)', // Adjusted minimum padding
                    paddingRight: 'clamp(0px, 2vw, 3rem)',
                    overscrollBehavior: 'contain', // game changer
                    marginTop: navHeight,
                    marginBottom: navHeight
                }}
            >
                <div>
                    <h1 className='text-4xl font-bold  text-center cursor-default'>Your Orders</h1>
                    <div className="divider"></div>
                </div>
                <div>
                    <h2 className='cursor-default text-center'>
                        <span className='underline text-orange-500 font-bold'>28</span>
                        <span> orders placed</span>
                    </h2>
                </div>
                <div
                    className='py-4 flex flex-col gap-4'
                >
                    {isLoading ? (
                        <div className="divider"></div>
                    ) : (
                        orderList?.map((order, index) => (
                            <OrderCard data={order} key={index} />
                        ))
                    )}

                </div>
            </div>
        </div>
    );
}