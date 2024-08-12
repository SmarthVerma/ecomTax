import { useLoginUser } from '@/hooks/useLoginUser';
import React from 'react';
import { useForm } from "react-hook-form";

function Login() {
    const { register, handleSubmit } = useForm();
    const { mutate: loginUser } = useLoginUser()

    const handleLogin = (data) => {
        console.log('data in login', data)
        loginUser(data)
    }


    return (
        <div
            className='min-h-screen max-h-screen w-full flex flex-col justify-center items-center gap-4'
        >
            <div className='aspect-square text-teal-50 w-full lg:w-[70%] sm:p-5 flex items-center flex-col justify-center gap-7 rounded-lg m-4  '>
                <h1 className='font-medium text-5xl text-center text-white text-shadow-xl'>
                    Welcome to <span className='text-orange-500'>Ecom</span>
                </h1>

                <div className='w-[90%] bg-pink sm:w-[60%] md:w-[50%] p-4 py-6 lg:w-[28%]'>
                    <form
                        onSubmit={handleSubmit(handleLogin)}
                        className='flex flex-col gap-3 w-full '>
                        <label className="input input-bordered flex items-center gap-2">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 16 16"
                                fill="currentColor"
                                className="h-4 w-4 opacity-70"
                            >
                                <path
                                    d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z"
                                />
                                <path
                                    d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z"
                                />
                            </svg>
                            <input {...register("email")} type="text" className="grow" placeholder="Email" />
                        </label>
                        <label className="input input-bordered flex items-center gap-2">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 16 16"
                                fill="currentColor"
                                className="h-4 w-4 opacity-70"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            <input {...register("password")} type="password" className="grow" placeholder="Password" />
                        </label>
                        <div className='text-center'>
                            <button className='px-2 py-1 bg-slate-600 max-w-min rounded-lg font-roboto'> Login</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;