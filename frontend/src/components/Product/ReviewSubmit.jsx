import React, { useCallback, useEffect, useState } from 'react';
import WriteReview from './WriteReview';
import DeleteReviewModal from './DeleteReview.modal';
import { useSelector } from 'react-redux';

export default function ReviewSubmit({ reviews }) {
  const [showForm, setShowForm] = useState(false);
  const [isReviewed, setIsReviewed] = useState(false);
  const [myReview, setMyReview] = useState(null);
  const data = useSelector(state => state.user.data)

  const isReview = useCallback(() => {
    if (data && reviews) {
      const { _id } = data;
      const reviewsArray = Array.from(reviews);

      // Check if there is any review created by the user
      const result = reviewsArray.find((rev) => rev.createdBy === _id);
      setIsReviewed(result);


      if (result) {
        // Find the specific review created by the user
        const rev = reviewsArray.find((rev) => rev.createdBy === _id);
        setMyReview(rev);
      }
    }
  }, [reviews, data]);

  useEffect(() => {
    isReview();
  }, [isReview]);

  return (
    <>
      {!showForm ? (
        <div className='flex justify-center space-x-3'>
          <button
            className='bg-[#bd3321] hover:bg-[#712217] text-lg font-bold px-3 py-3 rounded-md text-white'
            onClick={() => setShowForm(true)}
          >
            {isReviewed ? "Change review" : "Write review"}
          </button>

          {isReviewed && (
            <DeleteReviewModal myReview={myReview} />
          )}
        </div>
      ) : (
          <WriteReview myReview={myReview} />
      )}
    </>
  );
}
