import { useAuthContext } from "@/context/AuthContext"

export const isReview = (reviews) => {
    const { data } = useAuthContext()
    const { _id } = data

    console.log('jkdasdj reviews', reviews)

    const result = Array.from(reviews).some((rev) => rev.createdBy === _id)
    console.log(result)
    return result

}