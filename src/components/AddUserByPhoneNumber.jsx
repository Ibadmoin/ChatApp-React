import React, { useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import "./CSS/Adduser.css"


export default function AddUserByPhoneNumber() {
    const [userPh,setUserPh] = useState(null);

    const handleAddUser = ()=>{
        console.log(userPh);
        
    }


  return (
    <div className='add-user-container'> 
        <h3 >Add User by Phone number</h3>
        <PhoneInput className="PhoneInput" country={"pk"} value={userPh} onChange={setUserPh} />
        <button onClick={handleAddUser}>Add User</button>

      
    </div>
  )
}
