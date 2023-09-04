import React, { useState, useEffect } from "react";
import "./CSS/popup.css";
import { FaCamera, FaTimes, FaArrowCircleLeft } from "react-icons/fa";
import Modal from "react-modal";
import AvatarEditor from "react-avatar-editor";
import { BsArrowRepeat } from "react-icons/bs";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import {IoIosCheckmarkCircle} from 'react-icons/io'

Modal.setAppElement(document.getElementById("root"));
export default function ProfileUploader() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [editor, setEditor] = useState(null);
  const [zoom, setZoom] = useState(1.0);


  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    openModal();
  };
  

const handleZoomIn = ()=>{
  if(editor){
    setZoom(Math.min(zoom + 0.1, 2.0))
  }
}
const handleZoomOut = ()=>{
  if(editor){
    setZoom(Math.max(zoom - 0.1, 1.0))
  }
}

// ---------------base64 url here for changing and uploading image to firebase------------------//
const handelImageEdit = () => {
  if (editor) {
    const canvas = editor.getImageScaledToCanvas();
    const editedImageURL = canvas.toDataURL("image/jpeg"); // Get edited image as base64 URL
    console.log(editedImageURL); // Log the edited image URL to the console
    closeModal();
  }
};
// ----------------------------------
  return (
    <>
      <input type="file" accept="image/*" onChange={handleFileChange} hidden />
      <div
        className="UserProfile"
        onClick={() => document.querySelector('input[type="file"]').click()}
      >
        <img
          src="https://wellgroomedgentleman.com/media/images/Tony_Stark_Beard_with_Quiff_Hairstyle.width-800.jpg"
          alt=""
        />
        <div className="overlay">
          <FaCamera className="cam-icon" />

          <p>Change Profile Photo</p>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        className="Profile-Modal"
        contentLabel="Edit Profile Photo Modal"
      >
        <div className="Modal-Top">
          <i onClick={closeModal}>
            <FaTimes />
          </i>{" "}
          <h2>Drag image to adjust</h2>
          <div
            onClick={() => document.querySelector('input[type="file"]').click()}
            className="Input-Div"
          >
            <span>
              <BsArrowRepeat />
            </span>
            Upload
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              hidden
            />
          </div>
        </div>
        <div id="editor-container" className="editor-container" >
        {selectedFile && (
          <AvatarEditor 
            ref={(editorRef) => {
              setEditor(editorRef);
            }}
            image={selectedFile}
            width={640}
            height={640}
            border={50}
            borderRadius={320}
            color={[0, 0, 0, 0.6]}
            scale={zoom}
          />
        )}{" "}
        </div>
        <div className="zoomBtnWrapper">
          <button onClick={handleZoomIn}>
            <span>
              <AiOutlinePlus />
            </span>
          </button>
          <button onClick={handleZoomOut}>
            <span>
              <AiOutlineMinus />
            </span>
          </button>
        </div>
        <div className="Space_Div">
      <span className="Img-wrapper" onClick={handelImageEdit}>    <IoIosCheckmarkCircle  color="#C6E3FA" className="save_Img"/></span>

        </div>
      </Modal>
    </>
  );
}
