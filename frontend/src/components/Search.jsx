import React from 'react';
import { FaSearch } from 'react-icons/fa';

const SearchForm = () => {
    return (
        <form className="mx-auto p-2 w-full max-w-md">
            <div className="relative flex items-center gap-2 w-full">
                <input
                    type="text"
                    className="input input-bordered w-full p-2"
                    placeholder="Search"
                    aria-label="Search"
                />
                <button
                    type="submit"
                    className="absolute right-1 p-2"
                    aria-label="Search"
                >
                    <FaSearch />
                </button>
            </div>
        </form>
    );
};

export default SearchForm;