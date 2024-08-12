import React from 'react'
import findNavHeight from "../../util/findNavHeight";
import OrderSummary from '@/components/user/OrderSummary';
import OrderCard from '@/components/user/OrderCard';
import { useGetSingleOrder } from '@/hooks/useGetSingleOrder';
import { useParams } from 'react-router-dom';
import formatDate from "@/util/formatDateString";

export default function OrderDetails() {
  const navHeight = findNavHeight();
  const { id: orderId } = useParams()


  console.log(orderId)

  const { isLoading, data } = useGetSingleOrder(orderId)


  const paidAt = formatDate( data?.paidAt)

  return (
    <div className='min-h-screen w-full flex items-start justify-center'>
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

        <h1 className='text-4xl font-medium opacity-75'>
          Order Details
        </h1>
        <div className="divider my-1 h-1 opacity-30 after:bg-slate-600 before:bg-slate-600"></div>
        <div className='w-full h-5 flex'>
          <p className='text-sm'>
            Ordered on {paidAt}
          </p>
          <div className="divider divider-horizontal opacity-25 after:bg-slate-500 before:bg-slate-500"></div>
          <p className='text-sm'>
            Order# {orderId}
          </p>
        </div>
        <div className="divider my-1 h-1 opacity-30 after:bg-slate-600 before:bg-slate-600"></div>
          <div className='space-y-3'>
          <OrderSummary data={data} />
          {/* <OrderCard nav={false} /> */}
          </div>
      </div>
    </div>
  );
}