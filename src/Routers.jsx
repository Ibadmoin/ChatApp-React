import React from 'react';
import { BrowserRouter, Routes, Router, Route } from 'react-router-dom';
import Chat from "./pages/Chat";
import Auth from "./pages/Auth/Auth";



export default function Routers() {
  return (
    <BrowserRouter>
        <Routes>
            <Route  path='/' element={<Auth />}/>


            <Route  path='/chat' element={<Chat />}/>
        </Routes>
    </BrowserRouter>
   
  )
}
