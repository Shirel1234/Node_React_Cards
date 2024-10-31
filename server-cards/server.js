const express =require('express');
const cors =require('cors');
const app = express();
const PORT = 5001;
let nextId = 4;
app.use(cors());
app.use(express.json());

let cards = [
    { id: 1, text: 'A', color: '#9376E0' },
    { id: 2, text: 'B', color: '#E893CF' },
    { id: 3, text: 'C', color: '#F3BCC8' },
  ];

  //Get all cards
  app.get('/cards', (req, res) => {
    res.json(cards);
  });

   //Get a specific card
   app.get('/cards/:id', (req, res) => {
    const cardId = parseInt(req.params.id, 10);
    const card = cards.find(c => c.id === cardId);
    if (card) {
      res.json(card);
    } else {
      res.status(404).json({ message: 'Cards not found' });
    }
  });

  //Create a new Card
  app.post('/cards', (req, res) => {
    const { text, color } = req.body;
    if (!text || !color) {
      return res.status(400).json({ message: 'Text and color are required' });
    }
    const newCard = {
      id: nextId++,
      text,
      color,
    };
    cards.push(newCard);
    res.status(201).json({ message: 'Card created successfully', card: newCard });
  });

  //Update all cards
  app.put('/cards', (req, res)=>{
  cards = req.body;   
  res.json({ message: 'cards updated successfully'});
    });

  //Update a card
  app.put('/cards/:id', (req, res)=>{
  const cardId = parseInt(req.params.id, 10);
  const { text, color } = req.body;
  const cardIndex = cards.findIndex((c) => c.id === cardId);

  if (cardIndex !== -1) {
    cards[cardIndex] = { ...cards[cardIndex], text, color };
    res.json({ message: 'card updated successfully', card: cards[cardIndex] });
  } else {
    res.status(404).json({ message: 'Card not found' });
  }
  });
  //Delete a card
  app.delete('/cards/:id', (req, res) => {
    const cardId = parseInt(req.params.id, 10);
    const cardIndex = cards.findIndex((c) => c.id === cardId);
  
    if (cardIndex !== -1) {
      const deletedCard = cards.splice(cardIndex, 1);
      res.json({ message: 'Card deleted successfully', card: deletedCard[0] });
    } else {
      res.status(404).json({ message: 'Card not found' });
    }
  });

  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });