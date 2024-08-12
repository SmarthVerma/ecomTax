import React from 'react'
import anonny from "../../assets/annony.png";
import ReactStars from 'react-rating-stars-component';

export default function OtherReviews() {

    const options = {
        edit: false,
        value: 3,
        isHalf: true,
        size: 22,
        activeColor: "#FAA41F"
    }
        

    return (

        <>
            <div className=' flex flex-col items-center justify-center'>
                <h1 className='text-center text-4xl leading-tight font-bold font-kalam '>Reviews</h1>
                <hr className='w-[60%] p-3 opacity-50' />
            </div>
            <div className=' flex gap-2 overflow-x-auto'>
                <div className='h-80 w-80 bg-slate-700 p-4 grow-0 shrink-0 overflow-auto rounded-md' >
                    <div className='flex items-end gap-4'>
                        <div class="avatar">
                            <div class="w-12 rounded-full">
                                <img src={anonny} />
                            </div>
                        </div>
                        <span className='text-2xl font-medium font-roboto'>Smarth verma</span>
                    </div>
                    <ReactStars id='raiing' {...options} />
                    <div className="divider m-0"></div>
                    <div className='p4 font-kalam'>
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt, repellat? Illum temporibus quidem nam ipsa neque explicabo enim facere saepe, voluptatibus doloribus obcaecati, maiores itaque quasi, vel rerum voluptates ab asperiores deleniti? Quaerat, laborum voluptatibus! Corporis id rem earum nobis perferendis fuga ad facilis. Recusandae maxime odio eveniet molestias nostrum minima, ducimus beatae quasi.
                    </div>
                </div>
                <div className='h-80 w-80 bg-slate-700 p-4 grow-0 shrink-0 overflow-auto rounded-md' >
                    <div className='flex items-end gap-4'>
                        <div class="avatar">
                            <div class="w-12 rounded-full">
                                <img src={anonny} />
                            </div>
                        </div>
                        <span className='text-2xl font-medium font-roboto'>Smarth verma</span>
                    </div>
                    <div className="divider m-0"></div>
                    <div className='p4 font-kalam'>
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt, repellat? Illum temporibus quidem nam ipsa neque explicabo enim facere saepe, voluptatibus doloribus obcaecati, maiores itaque quasi, vel rerum voluptates ab asperiores deleniti? Quaerat, laborum voluptatibus! Corporis id rem earum nobis perferendis fuga ad facilis. Recusandae maxime odio eveniet molestias nostrum minima, ducimus beatae quasi.
                    </div>
                </div>
                <div className='h-80 w-80 bg-slate-700 p-4 grow-0 shrink-0 overflow-auto rounded-md' >
                    <div className='flex items-end gap-4'>
                        <div class="avatar">
                            <div class="w-12 rounded-full">
                                <img src={anonny} />
                            </div>
                        </div>
                        <span className='text-2xl font-medium font-roboto'>Smarth verma</span>
                    </div>
                    <div className="divider m-0"></div>
                    <div className='p4 font-kalam'>
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt, repellat? Illum temporibus quidem nam ipsa neque explicabo enim facere saepe, voluptatibus doloribus obcaecati, maiores itaque quasi, vel rerum voluptates ab asperiores deleniti? Quaerat, laborum voluptatibus! Corporis id rem earum nobis perferendis fuga ad facilis. Recusandae maxime odio eveniet molestias nostrum minima, ducimus beatae quasi.
                    </div>
                </div>
                <div className='h-80 w-80 bg-slate-700 p-4 grow-0 shrink-0 overflow-auto rounded-md' >
                    <div className='flex items-end gap-4'>
                        <div class="avatar">
                            <div class="w-12 rounded-full">
                                <img src={anonny} />
                            </div>
                        </div>
                        <span className='text-2xl font-medium font-roboto'>Smarth verma</span>
                    </div>
                    <div className="divider m-0"></div>
                    <div className='p4 font-kalam'>
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt, repellat? Illum temporibus quidem nam ipsa neque explicabo enim facere saepe, voluptatibus doloribus obcaecati, maiores itaque quasi, vel rerum voluptates ab asperiores deleniti? Quaerat, laborum voluptatibus! Corporis id rem earum nobis perferendis fuga ad facilis. Recusandae maxime odio eveniet molestias nostrum minima, ducimus beatae quasi.
                    </div>
                </div>
                <div className='h-80 w-80 bg-slate-700 p-4 grow-0 shrink-0 overflow-auto rounded-md' >
                    <div className='flex items-end gap-4'>
                        <div class="avatar">
                            <div class="w-12 rounded-full">
                                <img src={anonny} />
                            </div>
                        </div>
                        <span className='text-2xl font-medium font-roboto'>Smarth verma</span>
                    </div>
                    <div className="divider m-0"></div>
                    <div className='p4 font-kalam'>
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt, repellat? Illum temporibus quidem nam ipsa neque explicabo enim facere saepe, voluptatibus doloribus obcaecati, maiores itaque quasi, vel rerum voluptates ab asperiores deleniti? Quaerat, laborum voluptatibus! Corporis id rem earum nobis perferendis fuga ad facilis. Recusandae maxime odio eveniet molestias nostrum minima, ducimus beatae quasi.
                    </div>
                </div>
                <div className='h-80 w-80 bg-slate-700 p-4 grow-0 shrink-0 overflow-auto rounded-md' >
                    <div className='flex items-end gap-4'>
                        <div class="avatar">
                            <div class="w-12 rounded-full">
                                <img src={anonny} />
                            </div>
                        </div>
                        <span className='text-2xl font-medium font-roboto'>Smarth verma</span>
                    </div>
                    <div className="divider m-0"></div>
                    <div className='p4 font-kalam'>
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt, repellat? Illum temporibus quidem nam ipsa neque explicabo enim facere saepe, voluptatibus doloribus obcaecati, maiores itaque quasi, vel rerum voluptates ab asperiores deleniti? Quaerat, laborum voluptatibus! Corporis id rem earum nobis perferendis fuga ad facilis. Recusandae maxime odio eveniet molestias nostrum minima, ducimus beatae quasi.
                    </div>
                </div>
                <div className='h-80 w-80 bg-slate-700 p-4 grow-0 shrink-0 overflow-auto rounded-md' >
                    <div className='flex items-end gap-4'>
                        <div class="avatar">
                            <div class="w-12 rounded-full">
                                <img src={anonny} />
                            </div>
                        </div>
                        <span className='text-2xl font-medium font-roboto'>Smarth verma</span>
                    </div>
                    <div className="divider m-0"></div>
                    <div className='p4 font-kalam'>
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt, repellat? Illum temporibus quidem nam ipsa neque explicabo enim facere saepe, voluptatibus doloribus obcaecati, maiores itaque quasi, vel rerum voluptates ab asperiores deleniti? Quaerat, laborum voluptatibus! Corporis id rem earum nobis perferendis fuga ad facilis. Recusandae maxime odio eveniet molestias nostrum minima, ducimus beatae quasi.
                    </div>
                </div>
            </div>
            <div className="divider"></div>
        </>
    )
}
