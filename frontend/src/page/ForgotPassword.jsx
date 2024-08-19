import { useForgotPassword } from '@/hooks/general/useForgotPassword';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';

const ForgotPassword = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const { mutate: forgotPassword } = useForgotPassword()

    const onSubmit = (data) => {
        console.log(' this is the forgot data', data)
        forgotPassword(data)
    };

    return (
        <div className='min-h-screen w-full flex flex-col justify-center items-center bg-gray-900'>
            <div className='w-full max-w-md p-6 bg-gray-800 shadow-lg rounded-lg'>
                <h1 className='text-4xl font-bold text-center text-white mb-6'>
                    Forgot <span className='text-orange-500'>Password</span>
                </h1>
                <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                            Email Address
                        </label>
                        <div className="input input-bordered flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="white" className="h-4 w-4">
                                <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                                <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                            </svg>
                            <input
                                id="email"
                                type="email"
                                {...register('email', {
                                    required: 'Email is required',
                                    pattern: {
                                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                        message: 'Invalid email address'
                                    }
                                })}
                                className="w-full p-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                                placeholder="Email Address"
                            />
                        </div>
                        {errors.email && (
                            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                        )}
                    </div>
                    <div className='text-center'>
                        <button
                            type="submit"
                            className='w-full px-4 py-2 bg-orange-500 text-white font-bold rounded-lg hover:bg-orange-600 focus:outline-none focus:ring-4 focus:ring-orange-400'
                        >
                            Send Reset Link
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ForgotPassword;