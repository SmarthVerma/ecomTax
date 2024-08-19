import React, { useState } from "react";
import ReactStars from "react-stars";
import anonny from "../../assets/annony.png"; // Adjust the path to the image accordingly

const DeleteReviewModal = ({ rev, closeModal }) => {
    const [showModal, setShowModal] = useState(false); // State to control modal visibility

    const options = {
        edit: false,
        color: "gray",
        activeColor: "#ffd700",
        size: 20,
        isHalf: true,
    };

    const handleModalOpen = () => {
        setShowModal(true); // Open the modal
    };

    const handleModalClose = () => {
        setShowModal(false); // Close the modal
    };

    return (
        <div>
            <button
                className='bg-[#646160] hover:bg-[#4e4b4b] text-lg font-bold px-3 py-3 rounded-md text-white'
                onClick={() => handleModalOpen()}
            >
                Write review
            </button>

            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="modal-box bg-gray-800 text-gray-100 max-h-80 w-80 rounded-md overflow-auto p-6">
                        <div className="flex items-end gap-4">
                            <div className="avatar">
                                <div className="w-12 rounded-full">
                                    <img src={anonny} alt="User Avatar" />
                                </div>
                            </div>
                            <span className="text-2xl font-medium font-roboto">{rev?.name}</span>
                        </div>

                        <ReactStars id="rating" {...options} value={rev?.rating} />

                        <div className="divider m-0"></div>

                        <div className="py-4 font-kalam">
                            {rev?.comment}
                        </div>

                        <div className="flex justify-end">
                            <button
                                type="button"
                                className="btn bg-gray-600 text-gray-100 hover:bg-gray-800"
                                onClick={handleModalClose} // Close the modal on click
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DeleteReviewModal;