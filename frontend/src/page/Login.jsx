import { useLoginUser } from '@/hooks/user/useLoginUser';
import React from 'react';
import { useForm } from "react-hook-form";
import { Link } from 'react-router-dom'; // Assuming you use react-router-dom for routing

function Login() {
    const { register, handleSubmit } = useForm();
    const { mutate: loginUser } = useLoginUser()

    const handleLogin = (data) => {
        console.log('data in login', data)
        loginUser(data)
    }

    return (
        <div className='min-h-screen w-full flex flex-col justify-center items-center bg-gray-900'>
            <div className='w-full max-w-md p-6 bg-gray-800 shadow-lg rounded-lg'>
                <h1 className='text-4xl font-bold text-center text-white mb-6'>
                    Welcome to <span className='text-orange-500'>Ecom</span>
                </h1>

                <form onSubmit={handleSubmit(handleLogin)} className='space-y-4'>
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                        <div className="input input-bordered flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="white" className="h-4 w-4">
                                <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                                <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                            </svg>
                            <input {...register("email")} type="email" className="w-full p-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500" placeholder="Email" required />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Password</label>
                        <div className="input input-bordered flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="white" className="h-4 w-4">
                                <path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" />
                            </svg>
                            <input {...register("password")} type="password" className="w-full p-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500" placeholder="Password" required />
                        </div>
                    </div>
                    <div className='text-center'>
                        <button type="submit" className='w-full px-4 py-2 bg-orange-500 text-white font-bold rounded-lg hover:bg-orange-600 focus:outline-none focus:ring-4 focus:ring-orange-400'>
                            Login
                        </button>
                    </div>
                </form>

                <div className='mt-4 text-center'>
                    <Link to='/forgot-password' className='text-sm text-orange-400 hover:underline'>
                        Forgot Password?
                    </Link>
                </div>

                <div className='mt-2 text-center'>
                    <p className='text-gray-300'>
                        Don't have an account?{' '}
                        <Link to='/signup' className='text-orange-400 hover:underline'>
                            Sign Up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login;