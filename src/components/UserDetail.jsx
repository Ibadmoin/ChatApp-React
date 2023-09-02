import React from "react";
import "./CSS/comp.css";
import editIco from "../assets/icons/editing.png";
import UpdatePopUp from "./popup";
import { useState } from "react";


function UserDetail({imgUrl, userName}) {
  const [isEditModalOpen, setIsEditModalOpen]= useState(false);
  
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
            <UpdatePopUp  isOpen={isEditModalOpen} closeModal={()=>setIsEditModalOpen(false)}/>
 
        </div>
      </div>
    </>
  );
}

export default UserDetail;
