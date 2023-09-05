import React, { Fragment, useEffect, useState } from "react";
//---------pakages imports-----------------
import ToastExample from './extras/Toast'
// -------------pages---------------
import Chat from "./pages/Chat";
//-----------Components------------------
import "./App.css";
import UpdatePopUp from "./components/popup";
import { Button, Input } from "./components/Comp";
import UserImgContainer from "./components/UserImgContainer";
import Login from "./pages/auth/login/Login";
import SignUp from "./pages/auth/signup/SignUp";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";




function App() {
  const notify =()=>{
    toast('Wow! SO easy');
    toast.warn("Warning Notification !", {
      position: toast.POSITION.TOP_CENTER
    });

  }
  return (
    
    <div className="Container">
<BrowserRouter >
      <Routes>
        <Route path="/chat" element= {<PrivateRoute Element={Chat}/>} />
        <Route path="/" element= {<Login/>} />
        <Route path="/signup" element= {<SignUp/>} />
      </Routes>
    </BrowserRouter>
      
      
      {/* <Chat className="ChatBox" />  */}
      
    </div>
  );
}

export default App;
