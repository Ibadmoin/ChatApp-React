import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
const navigate = useNavigate()
useEffect(()=>{
    const token = localStorage.getItem('token')
    if(token){
        navigate('/chat')
    console.log('login', token)

    }
})
  return (
    <div>Login </div>
  )
}

export default Login