import { asyncHandler, asyncHandler2 } from "../utils/asyncHandler.js";
import { ApiResponse } from '../utils/ApiRespone.js'
import { ApiError } from '../utils/ApiError.js'
import { Product } from "../models/product.models.js";
import { ApiFeatures } from "../utils/ApiFeatures.js";
import mongoose from "mongoose";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { User } from "../models/user.models.js";

const getAllProducts = asyncHandler(async (req, res, next) => {
    console.log(`req.query`, req.query)
    console.log(`req.param`, req.params)

    const apiFeature = new ApiFeatures(Product.find(), req.query)
        .search()
        .filter()
        .pagination()

    const noOfProd = new ApiFeatures(Product.find(), req.query)
        .search()
        .filter()
        .noOfProducts()

    const products = await apiFeature.query
    const noOfProducts = await noOfProd.query

    console.log('this is the total produts in apiFeatures', noOfProducts)


    const productCount = await Product.aggregate([
        {
            $group: {
                _id: null,
                count: { $sum: 1 }
            }
        }
    ]);

    // console.log(productCount[0]?.count); // This will give you the total count of products

    const totalProducts = productCount[0]?.count || 0

    res.status(200)
        .json(
            new ApiResponse(
                200,
                { products, totalProducts, noOfProducts },
                "All the products"
            )
        )
})


const createProduct = asyncHandler(async (req, res, next) => {

    const { name, description, price, category } = req.body
    const createdBy = req.user._id
    const images = []; // to push

    console.log('req.body', req.body)
    console.log('req.files', req.files)

    let numberPrice = parseInt(price)

    const numOfFiles = req.files?.images?.length

    if (numOfFiles == undefined) throw new ApiError(400, "Select atleast 1 image of product")
    console.log('num of files', numOfFiles)

    // no of times we have to upload on cloudinary
    for (let i = 0; i < numOfFiles; i++) {
        const imageLocalPath = req.files?.images[i]?.path
        if (!imageLocalPath) throw new ApiError(500, "Error reading local path of images")
        console.log(`Image no ${i} path: ${imageLocalPath}`)

        //  uploading to cloudinary
        const img = await uploadOnCloudinary(imageLocalPath)
        if (!img) throw new ApiError(500, "Something went wrong while uploading img of product on cloudinary try again")
        console.log('this is response from cloudinary', img)
        images.push({
            public_ID: img.public_id,
            url: img.url
        })
    }

    console.log('This is the final array of images', images)
    const product = await Product.create(
        {
            name,
            description,
            price: numberPrice,
            category,
            images,
            createdBy
        }
    )

    return res.status(200).json(
        new ApiResponse(200, product, "Product created succesfully")
    )

})

const updateProduct = asyncHandler2(async (req, res, next) => {
    console.log(`reqParams: `, req.params)
    const { id } = req.params
    const data = req.body

    const product_id = await Product.findById(id)

    if (!product_id) throw new ApiError(404, "Product not found")

    const product = await Product.findByIdAndUpdate(
        id,
        data,
        {
            new: true,
            runValidators: true,
        }
    )

    if (!product) {
        throw new ApiError(500, "something went wrong")
    }

    res.status(200)
        .json(new ApiResponse(200, product, "Sucessfully Updates"))

})

const deleteProduct = asyncHandler2(async (req, res, next) => {
    console.log(`reqParams: `, req.params)
    const { id } = req.params

    const product_id = await Product.findById(id)

    if (!product_id) throw new ApiError(404, "Product not found")

    const deletedProduct = await Product.findByIdAndDelete(id)

    if (!deletedProduct) throw new ApiError(500, "Error deleting product")

    res.status(200)
        .json(new ApiResponse(200, deletedProduct, "Product deleted"))

})

const getProduct = asyncHandler(async (req, res, next) => {
    const { productId } = req.params


    const product = await Product.findById(productId)


    if (!product) throw new ApiError(404, "Product not found")

    res.status(200)
        .json(
            new ApiResponse(200, product, "Product details fetched")
        )

})

const getAllReviews = asyncHandler(async (req, res, next) => {
    const { productId } = req.params


    const product = await Product.findById(productId)

    const reviews = product.reviews

    if (!product) throw new ApiError(404, "Product not found")

    res.status(200)
        .json(
            new ApiResponse(200, reviews, "Product details fetched")
        )



})
const createEditReview = asyncHandler(async (req, res, next) => {
    const { productId } = req.params;
    const { comment, rating } = req.body;

    // Convert rating to a number
    const nRating = Number(rating);

    const user = req.user;

    const review = {
        name: user.name,
        comment,
        rating: nRating,
        createdBy: user.id
    };

    // Find the product
    const product = await Product.findById(productId);
    if (!product) throw new ApiError(404, "Product with this id not found");

    // Check if the user has already reviewed
    const isReviewed = product.reviews.some((each) => each.createdBy == user.id);

    if (isReviewed) {
        // Update existing review
        const index = product.reviews.findIndex(review => review.createdBy == user.id);
        product.reviews[index].comment = comment;
        product.reviews[index].rating = nRating;
    } else {
        // Add new review
        product.reviews.push(review);
    }
    await product.save({ validateBeforeSave: false });

    // Update product with aggregated values
    const [avgRatings, numOfReviews] = await Promise.all([
        Product.aggregate([
            { $match: { _id: new mongoose.Types.ObjectId(productId) } },
            { $unwind: "$reviews" },
            { $group: { _id: "$_id", ratings: { $avg: "$reviews.rating" } } },
            { $project: { _id: 0, ratings: 1 } }
        ]),
        Product.aggregate([
            { $match: { _id: new mongoose.Types.ObjectId(productId) } },
            { $unwind: "$reviews" },
            { $group: { _id: "$_id", numOfReviews: { $sum: 1 } } },
            { $project: { _id: 0, numOfReviews: 1 } }
        ])
    ]);

    // Update product ratings and review count
    product.ratings = avgRatings[0]?.ratings || 0;
    product.numOfReviews = numOfReviews[0]?.numOfReviews || 0
    console.log('No of reviews', numOfReviews)
    console.log('No of reviews', avgRatings)


    // Save the updated product
    await product.save({ validateBeforeSave: false });

    // Respond with success message
    return res.status(200)
        .json(new ApiResponse(200, product, "Successfully added review"));
});

const deleteReview = asyncHandler(async (req, res, next) => {
    const { productId } = req.params;
    const user = req.user;

    // Step 1: Find the product and check if user has made a review
    const product = await Product.findById(productId);
    if (!product) {
        throw new ApiError(404, "Product not found");
    }
    const isReviewed = product.reviews.some((review) => review.createdBy == user.id);
    if (!isReviewed) {
        throw new ApiError(400, "You haven't made a review yet");
    }
    // Step 2: Remove the review from product.reviews
    const index = product.reviews.findIndex((review) => review.createdBy == user.id);
    if (index !== -1) {
        product.reviews.splice(index, 1);
    } else {
        throw new ApiError(400, "Review not found");
    }

    await product.save({ validateBeforeSave: false });

    // Step 3: Aggregate average ratings and number of reviews
    const avgRatings = await Product.aggregate([
        { $match: { _id: new mongoose.Types.ObjectId(productId) } },
        { $unwind: "$reviews" },
        {
            $group: {
                _id: "$_id",
                ratings: { $avg: "$reviews.rating" },
                numOfReviews: { $sum: 1 }
            }
        },
        {
            $project: {
                _id: 0,
                ratings: 1,
                numOfReviews: 1
            }
        }
    ]);

    // Step 4: Update product with aggregated values
    if (avgRatings.length === 0) {
        product.ratings = 0;
        product.numOfReviews = 0;
    } else {
        console.log('this is really stupod bug', avgRatings)
        product.ratings = avgRatings[0].ratings;
        product.numOfReviews = avgRatings[0].numOfReviews;
    }

    // Step 5: Save the updated product
    await product.save({ validateBeforeSave: false });

    // Step 6: Respond with success message
    res.status(200).json(new ApiResponse(200, { afterDeleted: product }, "Deleted Successfully"));
});

const addToCart = asyncHandler(async (req, res, next) => {
    const { productId } = req.params;
    const { _id: userId } = req.user;
    const items = req.body;

    // find the product in the dataBase
    const product = await Product.findById(productId)
    if (!product) throw new ApiError(404, "Can't add to cart, Product not found");

    const user = await User.findById(userId)

    const isAlreadyInCart = user.inCart.items.some((prod) => prod.productId == productId)

    if (isAlreadyInCart) {
        return res.status(200)
            .json(new ApiResponse(200, null ,  "Already exist in cart"));
    }

    user.inCart.items.push({
        productId: productId
    });

    console.log('this is the user', user)

    await user.save({ validtateBeforeSave: false })

    return res.status(200)
        .json(new ApiResponse(200, user.inCart, "Successfully added to cart"));

})

const deleteFromCart = asyncHandler(async (req, res, next) => {
    const { productId } = req.params;
    const user = req.user;

    const product = await Product.findById(productId)
    if (!product) throw new ApiError(404, "Can't add to cart, Product not found");

    const isAlreadyInCart = user.inCart.items.some((prod) => prod.productId == productId)
    
    if (!isAlreadyInCart) {
        return res.status(200)
            .json(new ApiResponse(200, null, "Cant delete, cant find product in cart"));
    }

    const newItems = user.inCart.items.filter((prod)=> prod.productId!= productId)
    console.log('this is new item', newItems)

    user.inCart.items = newItems;

    await user.save({validateBeforeSave: false})

    return res.status(200)
        .json(new ApiResponse(200, user.inCart, "successfully deleted"));
})

const getCartItems = asyncHandler(async (req, res, next) => {
    console.log('helloooo??')
    const { _id: userId } = req.user;

    // Fetch user from the database
    const user = await User.findById(userId);
    if (!user) throw new ApiError(404, "User not found");

    console.log('checker')
    // Get productIds from the cart items
    const cartProductIds = user.inCart.items.map((item) => item.productId);

    console.log("check the arary,", cartProductIds)
    // Fetch product details for all productIds in the cart
    const cartProducts = await Product.find({ _id: { $in: cartProductIds } });

    console.log('cartProducts', cartProducts)

    if (cartProducts.length === 0) {
        return res.status(404)
            .json(new ApiResponse(404, null, "No products found in the cart"));
    }

    return res.status(200)
        .json(new ApiResponse(200, cartProducts, "Cart items fetched successfully"));
});

export {
    getAllProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    getProduct,
    createEditReview,
    deleteReview,
    getAllReviews,
    addToCart,
    deleteFromCart,
    getCartItems
}