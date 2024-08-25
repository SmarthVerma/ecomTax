import React from 'react';
import { useForm } from "react-hook-form";
import { useRegisterUser } from "../hooks/user/useRegisterUser";
import { Link } from 'react-router-dom'; // Assuming routing is done with react-router-dom
import SelectAvatar from '@/components/SelectAvatar';

function SignUp() {
    const { register, handleSubmit, control, setValue, watch } = useForm();
    const { mutate: signup } = useRegisterUser();

    const handleSignup = (inputData) => {
        signup(inputData);
    };

    // Watch avatar field value
    const avatar = watch("avatar");

    return (
        <div className='min-h-screen w-full flex flex-col justify-center items-center bg-gray-900'>
            <div className='w-full max-w-lg p-8 bg-gray-800 shadow-lg rounded-lg'>
                <h1 className='text-4xl font-bold text-center text-white mb-6'>
                    Welcome to <span className='text-orange-500'>Ecom</span>
                </h1>


                <form onSubmit={handleSubmit(handleSignup)} className='space-y-4'>
                    {/* Avatar input */}
                    <div className='flex justify-center mb-6'>
                        <SelectAvatar
                            profileSrc={avatar} // Controlled value from form
                            onChange={(file) => setValue("avatar", file)} // Handle avatar change
                        />
                    </div>
                    {/* Email Input */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1 ">Email</label>
                        <div className="input input-bordered flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="white" className="h-4 w-4">
                                <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                                <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                            </svg>
                            <input {...register("email")} type="email" className="w-full p-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500" placeholder="Email" required />
                        </div>
                    </div>

                    {/* Name Input */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1 ">Full Name</label>
                        <div className="input input-bordered flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="white" className="h-4 w-4">
                                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                            </svg>
                            <input {...register("name")} type="text" className="w-full p-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500" placeholder="Full Name" required />
                        </div>
                    </div>

                    {/* Password Input */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1 ">Password</label>
                        <div className="input input-bordered flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="white" className="h-4 w-4">
                                <path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" />
                            </svg>
                            <input {...register("password")} type="password" className="w-full p-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500" placeholder="Password" required />
                        </div>
                    </div>

                    {/* Confirm Password Input */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1 ">Confirm Password</label>
                        <div className="input input-bordered flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="white" className="h-4 w-4">
                                <path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" />
                            </svg>
                            <input {...register("confirmPassword")} type="password" className="w-full p-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500" placeholder="Confirm Password" required />
                        </div>
                    </div>

                    {/* Register Button */}
                    <div className='text-center'>
                        <button type="submit" className='w-full px-4 py-2 bg-orange-500 text-white font-bold rounded-lg hover:bg-orange-600 focus:outline-none focus:ring-4 focus:ring-orange-400'>
                            Register
                        </button>
                    </div>
                </form>

                {/* Link to Login */}
                <div className='mt-4 text-center'>
                    <p className='text-gray-300'>
                        Already have an account?{' '}
                        <Link to='/login' className='text-orange-400 hover:underline'>
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default SignUp;