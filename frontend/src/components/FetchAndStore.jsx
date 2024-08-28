import { fetchCartItems } from '@/store/slices/cartSlice'
import { fetchUserDetails } from '@/store/slices/userSlice'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

function FetchAndStore({ children }) {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user.data)

  useEffect(() => {
    console.log('Fetching user details')
    dispatch(fetchUserDetails())
  }, [dispatch]) // Run once when component mounts

  useEffect(() => {
    console.log('Fetching cart items')
    dispatch(fetchCartItems())

  }, [dispatch, user]) // Run when user data is available

  return (
    <div>
      {children}
    </div>
  )
}

export default FetchAndStore