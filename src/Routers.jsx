import React, { useContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Chat from "./pages/Chat";
import Auth from "./pages/Auth/Auth";
import { AuthContext } from './Context/AuthContext';

export default function Routers() {
  const { currentUser } = useContext(AuthContext);

  const ProtectedRoute = ({ children }) => {
    if (currentUser) {
      return <Navigate to="/" />;
    }
    return children;
  };

  const UnAuthenticatedRoute = ({children})=>{
    if(!currentUser){
      return <Navigate to="chat"/>

    }
    return children;

  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UnAuthenticatedRoute><Auth/></UnAuthenticatedRoute>} />
        
        <Route
          path="/chat"
          element={
            <ProtectedRoute>
              <Chat />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
