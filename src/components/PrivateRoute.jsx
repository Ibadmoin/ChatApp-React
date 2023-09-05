import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
const PrivateRoute = ({Element}) => {
    const navigate = useNavigate()
    useEffect(() =>{
        const token = localStorage.getItem('token')
        if (!token){
            navigate('/')
        }
    })
  return (
    <Element/>
  )
}

export default PrivateRoute