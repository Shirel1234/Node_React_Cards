import axios from "axios";
import React, { useEffect, useState } from "react";

const Card = ({ card, setCards }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(card.text);
  const [newColor, setNewColor] = useState(card.color);
  const [isColorPickerVisible, setIsColorPickerVisible] = useState(false);

  const colors = ["#9376E0", "#E893CF", "#F3BCC8", "#F6FFA6", "#FBD288"];

  useEffect(() => {
    setNewText(card.text);
  }, [card.text]);

  axios.defaults.baseURL = "http://localhost:5001";

  const deleteCard = async (cardId) => {
    try {
      const response = await axios.delete(`/cards/${cardId}`);
      console.log("Card deleted successfully:", response.data);
      setCards((prevCards) => prevCards.filter((card) => card.id !== cardId));
    } catch (error) {
      console.error("Error deleting card:", error);
    }
  };

  const updateCardText = async (cardId, text) => {
    try {
      const response = await axios.put(`/cards/${cardId}`, { ...card, text });
      setCards((prevCards) =>
        prevCards.map((c) => (c.id === cardId ? { ...c, text } : c))
      );
      console.log("Card updated successfully:", response.data);
    } catch (error) {
      console.error("Error updating card:", error);
    }
  };

  const handleTextClick = () => {
    setIsEditing(true);
  };

  const handleInputChange = (e) => {
    const updatedText = e.target.value;
    setNewText(updatedText);
    updateCardText(card.id, updatedText); // Update card text immediately on change
  };

  const updateCardColor = async (color) => {
    try {
      const response = await axios.put(`/cards/${card.id}`, { ...card, color });
      setNewColor(color);
      setCards((prevCards) =>
        prevCards.map((c) => (c.id === card.id ? { ...c, color } : c))
      );
      console.log("Card updated successfully:", response.data);
      setIsColorPickerVisible(!isColorPickerVisible);
    } catch (error) {
      console.error("Error updating color:", error);
    }
  };

  return (
    <div className="card" style={{ backgroundColor: newColor }}>
      <div className="text" onClick={handleTextClick}>
        {isEditing ? (
          <input
            type="text"
            value={newText}
            onChange={handleInputChange}
            onBlur={() => setIsEditing(false)}
            className="editable-input"
          />
        ) : (
          <label>{card.text}</label>
        )}
      </div>

      <div className="icons">
        {isColorPickerVisible && (
          <div className="color-picker">
            {colors.map((color) => (
              <div
                key={color}
                className="color-swatch"
                style={{ backgroundColor: color }}
                onClick={() => updateCardColor(color)}
              ></div>
            ))}
          </div>
        )}
        <i
          className="icon fas fa-circle"
          onClick={() => setIsColorPickerVisible(!isColorPickerVisible)}
        ></i>

        {!isColorPickerVisible && (
          <i
            className="icon fas fa-trash"
            onClick={() => deleteCard(card.id)}
          ></i>
        )}
      </div>
    </div>
  );
};

export default Card;
