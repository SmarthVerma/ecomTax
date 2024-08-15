import React from 'react'
import clothes from "../../assets/welcomeImages/clothes.png";
import macbook from "../../assets/welcomeImages/macbook.png";
import iphones from "../../assets/welcomeImages/iphones.png";
import bags from "../../assets/welcomeImages/bags.png";
import mouse from "../../assets/mouse.png";
import { scrollToFeature } from "../../util/scrollToFeature";
import './Welcome.css'

function Welcome() {


    return (
        <>
            <div className='clipPath bg-gray-900 min-h-screen flex relative flex-col justify-center items-center font-Roboto bg-linear-red m-0'>
        <div className='container'>
                <div className='relative z-10 text-white  text-center flex flex-col items-center place-content-center justify-center'>
                    <h3 className='text-2xl sm:text-3xl font-thin'>Welcome to Ecommerce</h3>
                    <h1 className='uppercase text-4xl m-4 font-bold'>Explore Our Latest Innovations</h1>
                    <div >
                        <button onClick={scrollToFeature} className=' hover:cursor-pointer rounded-xl px-6 py-3  group flex justify-center items-center hover:bg-blue-800 bg-blue-600 '>
                            <span className='text-2xl font-sans'>Scroll</span>
                            <img src={mouse} alt="" className='invert group-hover:running animate-upDown  paused relative top-[2px]' width={25} />
                        </button>

                    </div>
                </div>

                <div className=' absolute z-0 w-[100%] md:w-[80%] h-[80%] grid grid-cols-2  '>


                    <div className=' animate-fade w-[150px] sm:w-[250px]  rounded-md  opacity-0 delay1 fill-mode-forwards justify-self-center self-center relative left-11 '>
                        <img src={clothes} alt="clothes" className='pointer-events-none select-none drop-shadow' />
                    </div>

                    <div className='animate-fade w-[150px] sm:w-[250px] rounded-md opacity-0 delay2 fill-mode-forwards sm:justify-self-start self-end d relative left-11 sm:left-20 bottom-20 sm:bottom-7'>
                        <img src={macbook} alt="clothes" className='pointer-events-none select-none drop-shadow' />
                    </div>

                    <div className='animate-fade w-[150px] sm:w-[250px]  rounded-md opacity-0 delay4 fill-mode-forwards self-end bottom-40 justify-self-start sm:justify-self-center relative  sm:-top-2 sm:-right-20'>
                        <img src={iphones} alt="clothes" className='pointer-events-none  select-none drop-shadow' />
                    </div>

                    <div className=' animate-fade w-[100px]  sm:w-[150px] rounded-md opacity-0 delay3 fill-mode-forwards relative justify-self-center self-center sm:right-20'>
                        <img src={bags} alt="clothes" className='pointer-events-none select-none drop-shadow' />
                    </div>

                </div>
            </div>
            </div>
        </>
    )
}

export default Welcome
