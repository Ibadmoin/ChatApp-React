import React, { useState } from "react";
import "./CSS/Uploader.css";
import { MdCloudUpload, MdDelete } from "react-icons/md";
import { AiFillFileImage } from "react-icons/ai";
import AvatarEditor from "react-avatar-editor";

export default function Uploader() {
  const [image, setImage] = useState(null);
  const [fileName, setFileName] = useState("No selected File");
 const [editor ]
  return (
    <main>
      <form
        action=""
        onClick={() => document.querySelector(".input-field").click()}
      >
        <input
          type="file"
          accept="image/*"
          className="input-field"
          hidden
          onChange={({ target: { files } }) => {
            files[0] && setFileName(files[0].name);
            if (files) {
              setImage(URL.createObjectURL(files[0]));
            }
          }}
        />

        {image ? (
          <img src={image} width={200} height={200} />
        ) : (
          <>
            <MdCloudUpload color="#1475cf" size={60} />
            <p>Browse File to Upload</p>
          </>
        )}
      </form>
      <section className="Uploaded-row">
        <AiFillFileImage color="#1475cf" />
        <span className="upload-content">
          {fileName} -
          <MdDelete
            color="red"
            size={30}
            onClick={() => {
              setFileName("No selected File");
              setImage(null);
            }}
          />
        </span>
      </section>
    </main>
  );
}
