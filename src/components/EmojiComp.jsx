import React from "react";
import EmojiPicker from "emoji-picker-react";
import './CSS/emoji.css'

function EmojiPickerComponent({ onEmojiClick }) {
  return (
    <div className="emoji-picker-container">
      <EmojiPicker onEmojiClick={onEmojiClick} />
    </div>
  );
}

export default EmojiPickerComponent;
