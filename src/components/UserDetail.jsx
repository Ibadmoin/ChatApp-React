import React from "react";
import "./CSS/comp.css";
import editIco from "../assets/icons/editing.png";
import UpdatePopUp from "./UpdatePopUp";
import { useState } from "react";


function UserDetail({imgUrl,updateUserImage}) {
  const [isEditModalOpen, setIsEditModalOpen]= useState(false);
  const [userName,setUserName]= useState('Chalify User')
  
  const updateUserName = (newName)=>{
    setUserName(newName)

  }
  const handelEditClick = ()=>{
    setIsEditModalOpen(true);
    // console.log("clicked");
  }
  return (
    <>
      <div className="userDtailBox">
        <div className="imgWrapper">
          <img
            className="UserImg"
            src={imgUrl}
            alt=""
          />
        </div>
        <div className="userWrapper">
            <h3>{userName}</h3>
            <span className="EditProfile"  onClick={handelEditClick}><img src={editIco} alt="" /></span>
            <UpdatePopUp userName={userName} updateUserName={updateUserName} userImageUrl={imgUrl} updateUserImage={updateUserImage}  isOpen={isEditModalOpen} closeModal={()=>setIsEditModalOpen(false)}/>
 
        </div>
      </div>
    </>
  );
}

export default UserDetail;
