import { useCreateEditReview } from "@/hooks/user/useCreateEditReview";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import ReactStars from 'react-stars'

const WriteReview = ({ myReview }) => {
    // Set default values for rating and comment from myReview
    const defaultValues = {
        rating: myReview?.rating || 0,  // Default to 0 if myReview.rating is undefined
        comment: myReview?.comment || ""
    };

    const { register, handleSubmit, setValue } = useForm({ defaultValues });
    const [rating, setRating] = useState(myReview.rating); // State to hold the rating value
    const { mutate: createEditReview } = useCreateEditReview()
    const { id } = useParams()

    const handleWriteReview = (data) => {
        if (!data.rating) {
            toast.error("Add ratings")
            return
        }
        createEditReview({ data, id })
        setShowForm(false)
    };

    const options = {
        edit: true,
        size: 22,
        half: false,
        activeColor: "#FAA41F",
        value: rating, // Set the rating value
        onChange: (newRating) => {
            setRating(newRating); // Update rating state
            setValue("rating", newRating); // Update form value
        }
    };



    return (
        <>
            <div>

                <form onSubmit={handleSubmit(handleWriteReview)}>
                    <div className="mb-4">
                        <div className='flex p-4 justify-center '>
                            <div className='flex flex-col gap-4'>
                                <div className='flex flex-col justify-center items-center gap-2'>
                                    <label className='font-bold text-xl ' htmlFor="rating">Overall rating</label>
                                    <div className="divider m-0 h-0"></div>
                                    <ReactStars id='raiing' {...options} />
                                    <div className="divider m-0 h-0"></div>
                                </div>

                                <div className='flex flex-col justify-center items-center gap-2'>
                                    <label className='font-bold text-xl' htmlFor="review">Add a written review</label>
                                    <textarea
                                        id="review"
                                        rows="5"
                                        style={{ resize: 'none' }}
                                        {...register("comment")}
                                        className="block min-w-[30ch] lg:min-w-[60ch] p-3 border bg-gray-700 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Write your review here..."
                                    ></textarea>
                                </div>

                                <div className='text-center'>
                                    <button
                                        type="submit"
                                        className="bg-[#bd3321] hover:bg-[#9a2a1a] active:bg-[#801f14] text-white font-semibold h-min self-end py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
                                    >
                                        Submit Review
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                </form>
            </div>
        </>
    )
}

export default WriteReview;