import React, { Fragment, useState } from "react";
//---------pakages imports-----------------
import ToastExample from './extras/Toast'
// -------------pages---------------
import Chat from "./pages/Chat";
//-----------Components------------------
import "./App.css";
import UpdatePopUp from "./components/popup";
import { Button, Input,EmojiPickerComponent } from "./components/Comp";
import UserImgContainer from "./components/UserImgContainer";




function App() {
  const notify =()=>{
    toast('Wow! SO easy');
    toast.warn("Warning Notification !", {
      position: toast.POSITION.TOP_CENTER
    });

  }
  return (
    
    <div className="Container">
      <Chat className="ChatBox" /> 
    </div>
  );
}

export default App;
