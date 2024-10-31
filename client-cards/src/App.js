import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import ListCards from "./components/ListCards";


function App() {
  const [cards, setCards] = useState([]);

  const AxiosCard = async () => {
    try {
      const response = await axios.get("http://localhost:5001/cards");
      setCards(response.data);
    } catch (error) {
      console.error("Error fetching cards:", error);
    }
  };

  useEffect(() => {
    AxiosCard();
  }, []);

  return (
   
    <div className="App">
      <ListCards cards={cards} setCards={setCards} AxiosCards={AxiosCard} />
    </div>

  );
}

export default App;
