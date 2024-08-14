import React, { useState } from 'react';
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link } from 'react-router-dom';

const AddressForm = () => {
    // State for the form fields
    const [formData, setFormData] = useState({
        address: '',
        city: '',
        state: '',
        county: '',
        pinCode: '',
        phoneNo: '',
        // Example costs for demonstration purposes
        itemPrice: 0,
        taxPrice: 0,
        shippingPrice: 0,
    });

    // Calculate total price
    const totalPrice = formData.itemPrice + formData.taxPrice + formData.shippingPrice;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission
        console.log('Order data submitted:', formData);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
            <div className="w-full max-w-4xl p-8 bg-gray-800 rounded-lg shadow-lg flex space-x-8">
                {/* Address Form Section */}
                <div className="flex-1">
                    <div className="relative">
                        <Link to={'/cart'} 
                        className='absolute rounded-full top-0 left-0 md:-left-20 cursor-pointer hover:scale-125'>
                            <IoMdArrowRoundBack className='text-4xl' />
                        </Link>
                        <h1 className="text-2xl font-bold mb-4">Enter Shipping Information</h1>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* Form fields */}
                            <div>
                                <label htmlFor="address" className="block  text-sm font-medium mb-1">Address:</label>
                                <textarea
                                    id="address"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    className="w-full resize-none h-[70px] p-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    placeholder="Enter your address"
                                    maxLength={100}
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="city" className="block text-sm font-medium mb-1">City:</label>
                                <input
                                    id="city"
                                    name="city"
                                    type="text"
                                    value={formData.city}
                                    onChange={handleChange}
                                    className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    placeholder="Enter your city"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="state" className="block text-sm font-medium mb-1">State:</label>
                                <input
                                    id="state"
                                    name="state"
                                    type="text"
                                    value={formData.state}
                                    onChange={handleChange}
                                    className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    placeholder="Enter your state"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="county" className="block text-sm font-medium mb-1">County:</label>
                                <input
                                    id="county"
                                    name="county"
                                    type="text"
                                    value={formData.county}
                                    onChange={handleChange}
                                    className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    placeholder="Enter your county"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="pinCode" className="block text-sm font-medium mb-1">Pin Code:</label>
                                <input
                                    id="pinCode"
                                    name="pinCode"
                                    type="text"
                                    value={formData.pinCode}
                                    onChange={handleChange}
                                    className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    placeholder="Enter your pin code"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="phoneNo" className="block text-sm font-medium mb-1">Phone Number:</label>
                                <input
                                    id="phoneNo"
                                    name="phoneNo"
                                    type="tel"
                                    value={formData.phoneNo}
                                    onChange={handleChange}
                                    className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    placeholder="Enter your phone number"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-md"
                            >
                                Submit
                            </button>
                        </form>
                    </div>
                </div>

                {/* Cost Summary Section */}
                <div className="w-80 bg-gray-700 p-6 rounded-md">
                    <h2 className="text-lg font-bold mb-2">Order Summary</h2>
                    <div className="divider m-0 h-0 before:bg-gray-800 after:bg-gray-800"></div>
                    <p className="mb-1">Item Price: ${formData.itemPrice.toFixed(2)}</p>
                    <p className="mb-1">Tax: ${formData.taxPrice.toFixed(2)}</p>
                    <p className="mb-1">Shipping: ${formData.shippingPrice.toFixed(2)}</p>
                    <p className="font-bold">Total Cost: ${totalPrice.toFixed(2)}</p>
                </div>
            </div>
        </div>
    );
};

export default AddressForm;