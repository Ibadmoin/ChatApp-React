import React, { useState } from "react";
import "./CSS/Uploader.css";
import { MdCloudUpload, MdDelete } from "react-icons/md";
import { AiFillFileImage } from "react-icons/ai";
import AvatarEditor from "react-avatar-editor";

export default function Uploader() {
  const [image, setImage] = useState(null);
  const [fileName, setFileName] = useState("No selected File");
 const [editor, setEditor ] = useState(null);
 const [scale, setScale]= useState(1);

 const handleFileChange = (e)=>{
    const selectedFile = e.target.files[0];
    if(selectedFile) {
        setFileName(selectedFile.name);
        setImage(URL.createObjectURL(selectedFile))
    }

 }

 const handleZoomChange = (e)=>{
    const newScale = parseFloat(e.target.value);
    setScale(newScale);

 }

 const handleCrop = ()=>{
    if(editor) {
        const canvas = editor.getImage();
    }
 }
  return (
    <main>
        <form action=""   onClick={() =>{ document.querySelector(".input-field").click(); }}>
            <input type="file" accept="image/*" className="input-field" hidden  onChange={handleFileChange} />
            {image ? (
                <div className="preview-container">
                    <AvatarEditor 
                    ref={(editorRef)=> setEditor(editorRef)}
                    image={image}
                    width={200}
                    height={200}
                    border={50}
                    color={[255, 255, 255,0.6]}
                    scale={scale} />
                    <input type="range" min='1' max='2' step={0.01}
                    value={scale}
                    onChange={handleZoomChange} />
                    <button onclick={handleCrop}>Crop</button>
                </div>
            ): (<>
            <MdCloudUpload color="#1475cf" size={60} />
            <p>Browse File to Upload</p>
            </>
            )}
        </form>
        <section className="Iploaded-row">
            <AiFillFileImage color='#1475cf' />
            <span className="upload-content">
                {fileName} - 
                <MdDelete color="red" size={30} onClick={()=>{
                    setFileName('No selected File');
                    setImage(null);
                }} />
            </span>
        </section>
         </main>
  );
}
