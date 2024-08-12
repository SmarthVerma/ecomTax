import { useForm } from 'react-hook-form';
import { CiLock } from 'react-icons/ci';

const ChangePassword = () => {
    const { register, handleSubmit, watch, formState: { errors }, setError } = useForm();
    const watchNewPassword = watch('newPassword');

    const onSubmit = (data) => {
        if (data.newPassword !== data.confirmPassword) {
            setError("confirmPassword", {
                type: "manual",
                message: "Passwords do not match"
            });
            return;
        }
        console.log('Password changed');
        document.getElementById('change_password_modal').close();
    };

    return (
        <div>
            
            <button
                className="bg-gray-700 text-white font-bold py-2 px-4 rounded hover:bg-gray-900 flex items-center justify-center gap-2"
                onClick={() => document.getElementById('change_password_modal').showModal()}
            >
                <CiLock /> Change Password
            </button>
            <dialog id="change_password_modal" className="modal">
                <div className="modal-box bg-gray-800 text-gray-100">
                    <h3 className="font-bold text-2xl text-center">Change Password</h3>
                    <form onSubmit={handleSubmit(onSubmit)} className="py-2 flex flex-col gap-3">
                        <div className="flex flex-col gap-2">
                            <label className='opacity-45'>
                                New Password:
                            </label>
                            <input
                                type="password"
                                className={`input bg-gray-700 text-gray-100 border-gray-600 ${errors.newPassword ? 'border-red-500' : ''}`}
                                {...register('newPassword', { required: 'New Password is required' })}
                            />
                            {errors.newPassword && <p className="text-red-500">{errors.newPassword.message}</p>}
                        </div>
                        <div className="flex flex-col gap-2 ">
                            <label className='opacity-45'>
                                Confirm Password:
                            </label>
                            <input
                                type="password"
                                className={`input bg-gray-700 text-gray-100 border-gray-600 ${errors.confirmPassword ? 'border-red-500' : ''}`}
                                {...register('confirmPassword', { required: 'Confirm Password is required' })}
                            />
                            {errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword.message}</p>}
                        </div>
                        <div className="modal-action">
                            <button
                                type="submit"
                                className="btn bg-blue-600 text-gray-100 hover:bg-blue-800"
                            >
                                Confirm
                            </button>
                            <button
                                type="button"
                                className="btn bg-gray-600 text-gray-100 hover:bg-gray-800"
                                onClick={() => document.getElementById('change_password_modal').close()}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </dialog>
        </div>
    );
};

export default ChangePassword;