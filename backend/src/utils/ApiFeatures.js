import { Product } from "../models/product.models.js";
import { asyncHandler } from "./asyncHandler.js";


const convertOperators = (obj) => {
    if (typeof obj === 'object' && obj !== null) {
        for (let key in obj) {
            if (key === 'gt' || key === 'lt' || key === 'gte' || key === 'lte') {
                obj[`$${key}`] = obj[key];
                delete obj[key];
            } else if (typeof obj[key] === 'object') {
                convertOperators(obj[key]);
            }
        }
    }
};

class ApiFeatures {


    constructor(query, queryStr) {
        this.query = query     // getting Product.find()
        this.queryStr = queryStr // getting all req.params
    }


    search() {
        const keyword = this.queryStr.keyword ?
            {
                name: {
                    $regex: this.queryStr.keyword,
                    $options: 'i'
                }
            } : {}

        this.query = this.query.find({ ...keyword });

        return this // alows u to chain methods
    }

    filter() {

        let deepCopy = JSON.parse(JSON.stringify(this.queryStr));
        const removeFields = ["keyword", "page", "limit"]; // page and limit for pagination
        removeFields.forEach((key) => delete deepCopy[key]);
        // Converting gt | lt | gte | lte
        convertOperators(deepCopy);
        this.query = this.query.find(deepCopy)
        return this
    }

    noOfProducts() {
        // Create a copy of the query without pagination to count documents
        this.query = this.query.countDocuments();
        return this
    }

    pagination() {

        const currentPage = this.queryStr.page || 1
        console.log('currentPageyy', currentPage)

        const resultPerPage = this.queryStr.limit || 3;

        const skip = resultPerPage * (currentPage - 1) // its math

        this.query = this.query
            .limit(resultPerPage)
            .skip(skip)
            .select({
                name: 1,
                price: 1,
                images: 1,
                ratings: 1,
                numOfReviews: 1,
                reviews: 1
            });

        return this
    }

}



export { ApiFeatures }