import { useResetPassword } from '@/hooks/general/useResetPassword';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useParams } from 'react-router-dom';

const ResetPassword = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const {mutate: resetPassword} = useResetPassword()
    const params = useParams()


    const onSubmit =  (data) => {
        console.log({...data, ...params})
        resetPassword( {...data, ...params})
    };

    return (
        <div className='min-h-screen w-full flex flex-col justify-center items-center bg-gray-900'>
            <div className='w-full max-w-md p-6 bg-gray-800 shadow-lg rounded-lg'>
                <h1 className='text-4xl font-bold text-center text-white mb-6'>
                    Reset <span className='text-orange-500'>Password</span>
                </h1>
                <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
                            New Password
                        </label>
                        <div className="input input-bordered flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="white" className="h-4 w-4">
                                <path d="M4.5 2a.5.5 0 0 1 .5.5v11a.5.5 0 0 1-1 0V2.5a.5.5 0 0 1 .5-.5z" />
                                <path d="M7 1a2 2 0 0 1 2 2v12a2 2 0 0 1-4 0V3a2 2 0 0 1 2-2z" />
                            </svg>
                            <input
                                id="password"
                                type="password"
                                {...register('newPassword', {
                                    required: 'Password is required',
                                    minLength: {
                                        value: 6,
                                        message: 'Password must be at least 6 characters'
                                    }
                                })}
                                className="w-full p-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                                placeholder="New Password"
                            />
                        </div>
                        {errors.password && (
                            <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                        )}
                    </div>
                    <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-1">
                            Confirm Password
                        </label>
                        <div className="input input-bordered flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="white" className="h-4 w-4">
                                <path d="M5 5a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3V5z" />
                            </svg>
                            <input
                                id="confirmPassword"
                                type="password"
                                {...register('confirmPassword', {
                                    required: 'Confirm Password is required',
                                    validate: (value) =>
                                        value === watch('newPassword') || 'Passwords do not match'
                                })}
                                className="w-full p-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                                placeholder="Confirm Password"
                            />
                        </div>
                        {errors.confirmPassword && (
                            <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
                        )}
                    </div>
                    <div className='text-center'>
                        <button
                            type="submit"
                            className='w-full px-4 py-2 bg-orange-500 text-white font-bold rounded-lg hover:bg-orange-600 focus:outline-none focus:ring-4 focus:ring-orange-400'
                        >
                            Reset Password
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;