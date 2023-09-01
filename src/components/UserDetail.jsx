import React from "react";
import "./CSS/comp.css";
import editIco from "../assets/icons/editing.png"

function UserDetail({imgUrl, userName}) {
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
            <span className="EditProfile"><img src={editIco} alt="" /></span>
            
 
        </div>
      </div>
    </>
  );
}

export default UserDetail;
