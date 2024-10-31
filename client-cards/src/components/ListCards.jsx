import React, { useState } from "react";
import Card from "./Card";
import Modal from "./Modal";
import axios from "axios";

const ListCards = ({ cards, setCards }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddCardClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleSaveCard = async (newCard) => {
    try {
      const response = await axios.post("http://localhost:5001/cards", newCard);
      setCards((prevCards) => [...prevCards, response.data]);
      setIsModalOpen(false);
      console.log("The card added successfuly:");
    } catch (error) {
      console.error("Error saving new card:", error);
    }
  };

  return (
    <div>
      <ul className="ListCards">
        {cards.map((card) => (
          <li key={card.id}>
            <Card card={card} setCards={setCards} />
          </li>
        ))}
        <li>
          <div className="card last-card" onClick={handleAddCardClick}>
            <div className="plus-icon">
              <i className="fas fa-plus"></i>
            </div>
          </div>
        </li>
      </ul>
      <Modal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSave={handleSaveCard}
      />
    </div>
  );
};

export default ListCards;
