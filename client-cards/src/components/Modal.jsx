import React, { useState } from "react";
import "./Modal.css";

const Modal = ({ isOpen, onClose, onSave }) => {
  const [text, setText] = useState("");
  const [color, setColor] = useState("#ffffff");

  if (!isOpen) return null;

  const handleSave = () => {
    onSave({ text, color });
    setText("");
    setColor("#ffffff");
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2 className="titleModal">Add New Card</h2>
        <label className="labelModal">
          Text:
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </label>
        <label className="labelModal">
          Color:
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
        </label>
        <button className="button-save" onClick={handleSave}>
          Save
        </button>
        <button className="button-cancel" color="red" onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default Modal;
