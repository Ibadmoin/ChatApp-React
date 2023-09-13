import React, { useContext, useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import "./CSS/Adduser.css"
import { AuthContext } from '../Context/AuthContext';
import { db } from '../Firebase.config';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';


export default function AddUserByPhoneNumber() {
    const [userPh,setUserPh] = useState(null);
    const authUser = useContext(AuthContext);
    const currentUser = authUser.currentUser;
    

    const handleAddUser = async()=>{
        console.log(userPh);
        if(!userPh){
          return
        }else{
          const userDocRef = doc(db, "users",currentUser.uid);

          await updateDoc(userDocRef, {
            contacts : arrayUnion(userPh),
          })
          setUserPh("92")
        }
     
    }


  return (
    <div className='add-user-container'> 
        <h3 >Add User by Phone number</h3>
        <PhoneInput className="PhoneInput" country={"pk"} value={userPh} onChange={setUserPh} />
        <button onClick={handleAddUser}>Add User</button>

      
    </div>
  )
}
