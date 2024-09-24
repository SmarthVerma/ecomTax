import React, { useState } from 'react';

const Quantity = ({amount, productId}) => {

    const [quantity, setQuantity] = useState(amount);

    const handleChange = (e) => {
        // Ensure the quantity is always an integer
        setQuantity(Number(e.target.value));
    };

    return (
        <div className='flex flex-col items-start mt-4 space-y-1'>
            <div className='flex items-center space-x-2'>
                <p className='text-lg font-medium text-white'>
                    Quantity: <span className='font-bold text-blue-600'>{quantity}</span>
                </p>
            </div>
            <select
                value={quantity}
                onChange={handleChange}
                className='border border-gray-300 rounded-md bg-white text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
            >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                    <option key={num} value={num}>
                        {num}
                    </option>
                ))}
            </select>


        </div>
    );
};

export default Quantity;