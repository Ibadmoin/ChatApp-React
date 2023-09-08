import React, { useEffect, useState } from "react";
import { ReactDOM } from "react";
import Modal from "react-modal";
import { useRef } from "react";
import "./CSS/popup.css";
import { FaCamera } from "react-icons/fa";
import { ProfileUploader } from "./Comp";
import { MdEdit } from "react-icons/md";
import { FaCheck } from "react-icons/fa";
import {EmojiPickerComponent} from "./Comp"
import { FaSmile } from "react-icons/fa";
import { CiFaceSmile } from "react-icons/ci";
import { auth } from "../Firebase.config";
import { useNavigate } from "react-router-dom";
const customStyles = {
  content: {
    minWidth: "350px",
    width: "40%",
    minHeight: "400px",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
    zIndex: "3",
  },
};

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement(document.getElementById("root"));

function UpdatePopUp({ isOpen, closeModal ,}) {
  let subtitle;

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("ibad");
  const [limitCharacter, setlimitCharacter] = useState(25 - name.length);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
const navigate = useNavigate(); 
  const toggleEmojiPicker = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };
// function to handle selected emoji 
const handleEmojiSelect = (emoji) => {
  const updatedName = name + emoji.emoji;
  setlimitCharacter(limitCharacter-1)
  setName(updatedName);
  toggleEmojiPicker();
};


  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#f00";
  }

  //function to handle name edit btn click
  const handleEditClick = () => {
    setIsEditing(true);
  };

  // function to handle name input change ;
  const handleNameChange = (e) => {
    const inputValue = e.target.value;
    setName(inputValue);
    const remainingCharacters = 25 - inputValue.length;
    setlimitCharacter(remainingCharacters);
 
  };

  // function to handle save btn click

  const handleSaveClick = () => {
    setIsEditing(false);
  };

  // lgout and changing state here

 const handleLogout = ()=>{
  auth
    .signOut()
    .then(() => {
      console.log("logout hogaya hai");
      navigate("/")
      
    })
    .catch((error) => {
      console.error("Error during logout:", error);
    });
  
 } 
  return (
    <div>
      <Modal
        isOpen={isOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            position: "relative",
          }}
        >
          <h2
            style={{
              textAlign: "center",
              fontFamily: "sans-serif",
              fontSize: "1.5em",
            }}
            ref={(_subtitle) => (subtitle = _subtitle)}
          >
            Update Profile
          </h2>
          <button
            style={{
              position: "absolute",
              right: "0",
              border: "none",
              background: "transparent",
              fontSize: "2em",
              color: "#6ea9d7",
            }}
            onClick={closeModal}
          >
            {" "}
            X
          </button>
        </div>
        <div
          style={{
            background: "skyBlue",
            padding: "10px 5px",
            width: "95%",
            minHeight: "500px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            margin: "15px auto",
          }}
        >
          <ProfileUploader />

          <div className="editProfileDiv">
            <div>
              <span className="profileUpdateheading">Your name</span>
            </div>
            <div className="yourNameWrapper">
              {isEditing ? (
                <div className="innerEditWrapper">
                  <input
                    type="text"
                    value={name || ''}
                    onChange={handleNameChange}
                    maxLength={25}
                    autoFocus
                  />
                  <span className="emoji_Count">
                    <div className="textLimit">{limitCharacter}</div>
                    <div>
                      <button
                        className="emoji-picker-button"
                        onClick={toggleEmojiPicker}
                        disabled={limitCharacter <= 0}
                      >
                        <CiFaceSmile size={20} color="" />

                      </button>
                    
                    </div>
                  </span>{" "}
                  <button className="SaveName" onClick={handleSaveClick}>
                    <FaCheck />
                  </button>
                  {showEmojiPicker && (
                        <EmojiPickerComponent
                          onEmojiClick={handleEmojiSelect}
                          className="emojiContainer"
                        />
                      )}
                </div>
              ) : (
                <div className="innerNameWrapper">
                  <span className="nametext">{name}</span>
                </div>
              )}
              {!isEditing && (
                <span className="EditSpan" onClick={handleEditClick}>
                  <MdEdit color="gray" size={20} />
                </span>
              )}
         
              
            </div>
          </div>
          <button onClick={handleLogout} className="logOutBtn">Log Out</button>
        </div>
      </Modal>
    </div>
  );
}

export default UpdatePopUp;
