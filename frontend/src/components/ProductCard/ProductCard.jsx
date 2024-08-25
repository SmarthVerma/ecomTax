/* 
https://tinyurl.com/ffWishlistProductCard 
*/
import React from "react";
import ReactStars from 'react-stars'
import "./ProductCard.css";
import { Link } from "react-router-dom";
import img from '../../assets/products/hpLaptop.png'
import { useDispatch } from "react-redux";
import { addCartItem } from "@/store/slices/cartSlice";

const ProductCard = ({ data }) => {
    const { _id: id, name, numOfReviews, price, ratings, images } = data
    const dispatch = useDispatch()

    const options = {
        edit: false,
        value: ratings,
        isHalf: true,
        size: 14
    }



    const handleAddToCart = (e) => {
        e.preventDefault(); // Prevents default action
        e.stopPropagation(); // Stops event from bubbling up
        dispatch(addCartItem({ productId: id, amount: 1 }));
    };
    const handleLinkClick = (e) => {
        if (e.target.closest('.add-button')) {
            e.stopPropagation(); // Ensure the button click does not navigate
            e.preventDefault(); // Prevent default action
        }
    };


    return (
        <Link to={`/products/${id}`} onClick={(e) => handleLinkClick(e)}>
            <div className="product-card relative bg-[#1F2937] border-t-4text-whjite text-black rounded-lg flex flex-col justify-center items-center">
                <div className="image-container relative min-h-48">
                    <img className="image object-cover w-full h-full" src={images[0].url} alt="Product Image" />
                    <div className="overlay absolute inset-0  opacity-30"></div>
                </div>
                <h4>{name}</h4>
                <div className="flex gap-2 items-center">
                    <ReactStars {...options} />
                    <span className="text-blue-500 underline">
                        {`(${numOfReviews})`}
                    </span>
                </div>
                <div className="price-and-add flex justify-between w-full px-4">
                    <span className="font-bold text-orange-400">₹{price}</span>
                    <button
                        type="button"
                        className="add-button z-30"
                        onClick={(e) => handleAddToCart(e)}
                    >
                        +
                    </button>
                </div>
            </div>
        </Link>

    );
};

export default ProductCard;
