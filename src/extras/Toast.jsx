import React from 'react';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";


function ToastExample({type,text}) {
  const notify = () => {
    if(type === "success"){
      toast.success(`${text}!`, {
        position: toast.POSITION.TOP_CENTER
      });

    }else if(type === "error"){

      
      toast.error(`${text} !`, {
        position: toast.POSITION.TOP_CENTER
      });
    }else if(type === "warn"){
      
      toast.warn(`${text}!`, {
        position: toast.POSITION.TOP_CENTER
      });
    }else if(type === "info"){
      
      toast.info( `${text}!`,{
        position: toast.POSITION.TOP_CENTER
      });
      
    }else{
      
      toast(`${text}!`);
    }
    



    // toast("Custom Style Notification with css class!", {
    //   position: toast.POSITION.BOTTOM_RIGHT,
    //   className: 'foo-bar'
    // });
  };

   return (
      <>
        <ToastContainer  />
      </>
    );
}


export default ToastExample;