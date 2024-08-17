import Avatar from "../SelectAvatar";
import { useForm } from 'react-hook-form';
import { CiEdit } from "react-icons/ci";

const EditProfile = ({ profileSrc } ) => {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    console.log('test in profileSrc', profileSrc)

    const onSubmit = (data) => {
        // Implement profile update logic here
        console.log("Profile updated:", data);
        document.getElementById('edit_profile_modal').close();
    };

    const handleModalOpen = () => {
        // Simulate fetching user data and setting values
        setValue('name', 'John Doe'); // Replace with actual user data
        setValue('email', 'john.doe@example.com'); // Replace with actual user data
        document.getElementById('edit_profile_modal').showModal();
    };

    return (
        <div>
            <button
                className="bg-blue-700 text-white font-bold py-2 px-4 rounded hover:bg-blue-900 flex justify-center items-center gap-2"
                onClick={handleModalOpen}
            >
                <CiEdit /> Edit Profile
            </button>
            <dialog id="edit_profile_modal" className="modal">
                <div className="modal-box bg-gray-800 text-gray-100">
                    <h3 className="font-bold text-2xl text-center">Edit Profile</h3>
                    <form onSubmit={handleSubmit(onSubmit)} className="py-2 flex flex-col gap-3">

                        <Avatar profileSrc={profileSrc} />

                        <div className="flex flex-col gap-2">
                            <label className='opacity-45'>
                                Name:
                            </label>
                            <input
                                type="text"
                                className="input bg-gray-700 text-gray-100 border-gray-600"
                                {...register('name', { required: 'Name is required' })}
                            />
                            {errors.name && <p className="text-red-500">{errors.name.message}</p>}
                        </div>

                        <div className="modal-action">
                            <button type="submit" className="btn bg-blue-600 text-gray-100 hover:bg-blue-800">
                                Save
                            </button>
                            <button
                                type="button"
                                className="btn bg-gray-600 text-gray-100 hover:bg-gray-800"
                                onClick={() => document.getElementById('edit_profile_modal').close()}
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

export default EditProfile;