import { useEffect, useState } from "react";
import Card from "./Card";
import Modal from "./Modal";
import axios from "axios";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const ListCards = ({ cards, setCards, AxiosCard }) => {
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
      AxiosCard();
      console.log("The card added successfuly:");
    } catch (error) {
      console.error("Error saving new card:", error);
    }
  };

  const moveCard = (fromIndex, toIndex) => {
    console.log("from: " + fromIndex, "toIndex: " +toIndex);
    setCards((prevCards) => {
      const updatedCards = [...prevCards];
      const [movedCard] = updatedCards.splice(fromIndex, 1);
      updatedCards.splice(toIndex, 0, movedCard);
      console.log("res: " + updatedCards[0].id);
      return updatedCards;
    });
  };

  return (
    <DndProvider backend={HTML5Backend}>
    <div>
      <ul className="ListCards">
        {cards.map((card, index) => (
          <li key={card.id}>
            <Card card={card} index={index} moveCard={moveCard} setCards={setCards} />
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
    </DndProvider>
  );
};

export default ListCards;
