import React, { Fragment, useState } from "react";
//---------pakages imports-----------------
import ToastExample from './extras/Toast'
// -------------pages---------------
import Chat from "./pages/Chat";
import Auth from "./pages/Auth/Auth"
//-----------Components------------------
import "./App.css";
import UpdatePopUp from "./components/popup";
import { Button, Input,EmojiPickerComponent } from "./components/Comp";
import UserImgContainer from "./components/UserImgContainer";




function App() {
 
  return (
    
    <div className="Container">
    <Auth/>
      {/* <Chat className="ChatBox" />  */}
    </div>
  );
}

export default App;
