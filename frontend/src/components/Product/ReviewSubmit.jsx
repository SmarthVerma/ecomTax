import React, { useCallback, useEffect, useState } from 'react';
import { useAuthContext } from "@/context/AuthContext";
import WriteReview from './WriteReview';
import DeleteReviewModal from './DeleteReview.modal';

export default function ReviewSubmit({ reviews }) {
  const [showForm, setShowForm] = useState(false);
  const [isReviewed, setIsReviewed] = useState(false);
  const [myReview, setMyReview] = useState(null)
  const { data } = useAuthContext(); // Assuming this provides user data
  const isReview = useCallback(() => {

    const { _id } = data;
    const result = Array.from(reviews).some((rev) => rev.createdBy === _id);
    setIsReviewed(result);

    if (!result) return
    const rev = Array.from(reviews).find((rev) => rev.createdBy === _id);
    setMyReview(rev)
  }, [reviews, data]); 

  useEffect(() => {
    isReview();
  }, [isReview]);


  if (!showForm) return (
    <>
      <div className='flex justify-center space-x-3'>
        <button
          className='bg-[#bd3321] hover:bg-[#712217] text-lg font-bold px-3 py-3 rounded-md text-white'
          onClick={() => setShowForm(true)}
        >
          Write review
        </button>

        {isReviewed && (
          <DeleteReviewModal myReview={myReview} />
        )}
      </div>

    </>
  );

  if (showForm) return <WriteReview />;
}