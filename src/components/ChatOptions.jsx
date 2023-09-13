import React, { useState } from 'react';
import { MenuItem, IconButton, Menu } from '@mui/material';
import {FiMoreVertical} from "react-icons/fi"
export default function ChatOptions({closeChat}) {
  const [selectedOption, setSelectedOption] = useState(null);
  const userChatOptions = ["Contact Info", "Clear Chat", "Block", "Close Chat"];

  const handleClick = (e) => {
    setSelectedOption(e.currentTarget);
  }
  const open = Boolean(selectedOption);

  const handleClose = (option) => {
    if(option === "Close Chat" ){
      closeChat()
    }
    console.log("Selected option: ", option); // Corrected typo here

    setSelectedOption(null);
  }

  return (
    <div>
      <IconButton
        aria-label='more'
        onClick={handleClick}
        aria-haspopup="true"
        aria-controls='long-menu'
      >
        <FiMoreVertical/>
      </IconButton>
      <Menu
        anchorEl={selectedOption}
        keepMounted
        onClose={handleClose}
        open={open}
      >
        {userChatOptions.map((option) => (
          <MenuItem key={option} onClick={() => handleClose(option)}>
            {option}
          </MenuItem>
        ))}
      </Menu>
    </div>
  )
}
