import React, { useCallback, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { scrollToFeature } from '@/util/scrollToFeature';

const SearchForm = () => {

    
    const [queryParams, updateQueryParams] = useSearchParams();
    const navigate = useNavigate()
    const keyword = queryParams.get('keyword')
    
    const { handleSubmit, register, setValue } = useForm({
        defaultValues: {
            keyword: keyword || '',
        }
    })

    useEffect(() => {
        setValue('keyword', keyword || ''); // Ensure default value is set
    }, [keyword, setValue]);
    

    const handleSearch = async (data) => {
        console.log(data)
        navigate('/')
        updateQueryParams({ keyword: data.keyword }, {replace: true});
        setTimeout(() => { // otherwise wont work
            scrollToFeature()
        }, 0);
    }


    return (
        <form
            onSubmit={handleSubmit(handleSearch)}
            className="mx-auto p-2 w-full max-w-md">
            <div className="relative flex items-center gap-2 w-full">
                <input
                    type="text"
                    className="input input-bordered w-full p-2"
                    placeholder="Search"
                    aria-label="Search"
                    {...register('keyword')}
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