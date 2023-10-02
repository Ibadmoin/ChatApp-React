import React from 'react'
import "./CSS/message.css"
import {MdOutlineBlock} from "react-icons/md";
import {IoPersonAdd} from "react-icons/io5"

export default function NewUserAlert({onBlockClick, onAddToContactClick}) {
  return (
    <div className='MessageWrapper'>
        <p>The sender is not in your contact list</p>
        <div className='BtnWrapper'>
            <button className='blockBtn' onClick={onBlockClick}> <MdOutlineBlock  />Block</button>
            <button className='addBtn' onClick={onAddToContactClick}> <IoPersonAdd /> Add to contacts</button>
        </div>
      
    </div>
  )
}
