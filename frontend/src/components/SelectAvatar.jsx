import React, { useRef, useState, useEffect } from 'react';
import { Avatar } from '@mui/material';
import { FaCamera } from "react-icons/fa";

export default function SelectAvatar({ onChange, value, profileSrc }) {
    const inputRef = useRef();
    const [avatarSrc, setAvatarSrc] = useState(profileSrc);


    const handleFileInput = () => {
        console.log('Button clicked');
        inputRef.current.click();
    };

    const handleFileChange = (e) => {
        console.log('File input changed', e);
        const file = e.target.files[0];
        onChange(file); // Send the file back to the form
        if (file) {
            const objectURL = URL.createObjectURL(file);
            setAvatarSrc(objectURL);

            // Optionally, release the object URL after use to free up memory
            return () => URL.revokeObjectURL(objectURL);
        }
    };



    return (
        <div className='w-full flex justify-center items-end'>
            <div className='border rounded-full relative'>
                <Avatar
                    alt="User Avatar"
                    src={avatarSrc}
                    sx={{ width: 88, height: 88 }}
                />
                <button
                    type='button'
                    onClick={handleFileInput}
                    className='absolute inset-0 flex justify-center items-center bg-white bg-opacity-50 rounded-full'
                >
                    <FaCamera className='text-gray-500' />
                </button>
            </div>
            <input
                ref={inputRef}
                type="file"
                className='hidden'
                onChange={handleFileChange}
            />
        </div>
    );
}