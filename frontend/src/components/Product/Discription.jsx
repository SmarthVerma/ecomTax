import React from 'react'
import ReactStars from 'react-rating-stars-component'
import NumberInput from "../NumberInput";

function Discription() {

  const options = {
    edit: false,
    value: 3,
    isHalf: true,
    size: 22,
    activeColor: "#FAA41F"
  }

  const numOfReviews = 2; // add where i can see on hover how many rated whatx`x
  const _id = "djaidhiuahkh23kuehkauhdku"
  const price = 2100;
  const inStock = true;

  return (
    <>
      <div className='px-5 font-roboto max-w-screen-md'>
        <div>
          <h1 className='text-[#fffefe] text-3xl  font leading-8 space'>
            Product!
          </h1>
          <span className='text-[#969494] text-xs opacity-70 leading-none'> {`ProductId- ${_id}`} </span>
        </div>



        <div className='text-sm opacity-65 flex flex-col gap-3'>
          <div className="divider m-0 h-0"></div>
          <div className='flex gap-2 py-2 lg:py-4 px-2 justify-center lg:justify-start items-center' >
            <span> <ReactStars {...options} /> </span> <p className=' kalam-bold'>{`(${numOfReviews}) Reviews`}</p>
          </div>
          <div className="divider m-0 h-0"></div>
        </div>


        <div className='py-3 lg:py-0'>

          <div className='text-5xl font-bold py-3 lg:py-6 text-shadow-sm'>
            ₹{`${price}`}
          </div>
          <div className='w-full flex  gap-4 lg:flex-row items-center justify-center lg:justify-start'>
            <NumberInput min={1} value={1} />
            <button className='bg-[#f44d00] hover:bg-[#f44d00af] px-3 py-1 rounded-md text-white font-medium'>Add to cart</button>
          </div>

        </div>
        <div className="divider"></div>

        <div>
          <p className='text-gray-400 font-thin'>Status:
            <span className={`font-bold ${inStock ? "text-green-500" : "text-red-600"}`}>
              {`${inStock ? " inStock" : " Not in stock"}`}
            </span>
          </p>
        </div>

        <div className="divider"></div>

        <div>
          <h2 className='text-lg opacity-75 kalam-bold '>Discription: </h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure, est animi dignissimos aperiam corporis id nulla aliquam nemo praesentium incidunt dolor eum nihil nam aspernatur itaque, eos sunt quibusdam minima unde. Laudantium porro nemo voluptate facilis, sequi natus dolorum assumenda eveniet eos recusandae deserunt numquam libero voluptas suscipit, architecto eum? Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tempora eos cupiditate distinctio necessitatibus animi voluptas quia voluptates architecto soluta? Blanditiis, adipisci distinctio illo qui veritatis beatae fugit sint molestiae odio?
          </p>
        </div>

      </div>
    </>
  )
}

export default Discription
