import React, { useState } from 'react'
import './CSS/popup.css'
import { FaCamera } from 'react-icons/fa'
import Modal from 'react-modal';
import AvatarEditor from 'react-avatar-editor';



Modal.setAppElement(document.getElementById('root'));
export default function ProfileUploader() {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [editor, setEditor] = useState(null);

    const openModal = ()=>{
        setIsModalOpen(true);
    }
    const closeModal = ()=>{
        setIsModalOpen(false);
    }


    const handleFileChange = (e)=>{
        const file = e.target.files[0];
        setSelectedFile(file);
        openModal();
    }
    const handelImageEdit = ()=>{
        if(editor){
            const canvas = editor.getImageScaledToCanvas();
            closeModal();
        }
    }
  return (
    <>
    <input type='file' accept='image/*'
    onChange={handleFileChange}
    hidden />
    <div className='UserProfile' onClick={()=> document.querySelector('input[type="file"]').click()}><img src="https://wellgroomedgentleman.com/media/images/Tony_Stark_Beard_with_Quiff_Hairstyle.width-800.jpg" alt="" />
          <div className='overlay'>
            <FaCamera className='cam-icon' />

            <p>Change Profile Photo</p>
          </div>
          </div>

          <Modal  
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          className='Profile-Modal'
          contentLabel='Edit Profile Photo Modal'>
            <div className='Modal-Top'><i onClick={closeModal}>X</i> <h2>Drag image to adjust</h2><div className='Input-Div'></div></div>

            {selectedFile && (
                <AvatarEditor 
                ref={(editorRef)=>{setEditor(editorRef)}}
                image={selectedFile}
                width={250}
                height={250}
                border={50}
                color={[255,255,255,0.6]}
                scale={1} />
            )}
        
            </Modal> 
    </>
  )
}
