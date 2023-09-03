



import React, { Fragment,useState } from 'react';
import Chat from './pages/Chat';
import "./App.css" 
import UpdatePopUp from './components/popup';
import { Button,Input } from './components/Comp';



function App(){
  const [value ,setValue] = useState('');




return (
  <div className="Container">
  {/* <Chat className="ChatBox" /> */}

  <p>{value}</p>

  </div>

)
}


export default App