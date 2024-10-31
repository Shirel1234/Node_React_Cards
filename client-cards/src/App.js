import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import ListCards from "./components/ListCards";

function App() {
  const [cards, setCards] = useState([]);

  const AxiosBook = async () => {
    try {
      const response = await axios.get("http://localhost:5001/cards");
      setCards(response.data);
    } catch (error) {
      console.error("Error fetching cards:", error);
    }
  };


  useEffect(() => {
    AxiosBook();
  }, [cards]);

  return (
    <div className="App">
      <ListCards cards={cards} setCards={setCards} />
    </div>
  );
}

export default App;