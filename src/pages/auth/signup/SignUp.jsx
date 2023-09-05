import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const SignUp = () => {
const navigate = useNavigate()
useEffect(() =>{
const token = localStorage.getItem('token')
if (token){
    navigate('/chat')
    console.log('signup', token)
}
})  
return (
    <div>SignUp</div>
  )
}

export default SignUp