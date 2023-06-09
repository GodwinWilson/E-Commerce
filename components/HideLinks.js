import React from 'react'
import { selectIsLoggedIn } from '../redux/features/authSlice'
import { useSelector } from 'react-redux'

const LoggedIn = ({children}) => {
    const isLoggedIn = useSelector(selectIsLoggedIn)
  if(isLoggedIn){
    return children
  }
  else return null
}

export const LoggedOut = ({children}) => {
    const isLoggedIn = useSelector(selectIsLoggedIn)
  if(!isLoggedIn){
    return children
  }
  else return null
}

export default LoggedIn
