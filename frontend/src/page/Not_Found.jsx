import React from 'react';
import { Link } from 'react-router-dom';
const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-gray-100 text-center p-4">
            <h1 className="text-9xl font-bold text-red-500">404</h1>
            <p className="text-2xl mt-4">Page Not Found</p>
            <p className="text-lg mt-2">Sorry, the page you're looking for doesn't exist.</p>
            <Link to="/" className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition duration-300">
                Go back to the homepage
            </Link>
        </div>
    );
};

export default NotFound;