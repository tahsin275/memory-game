import SingleCard from "./SingleCard";
import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const imgObj = [
    { src: "images/image5.png", matched: false },
    { src: "images/image6.png", matched: false },
    { src: "images/image7.png", matched: false },
    { src: "images/image11.png", matched: false },
    { src: "images/image14.png", matched: false },
    { src: "images/image15.png", matched: false },
  ];

  const [moves, setMoves] = useState(0);
  const [cards, setCards] = useState([]);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);

  const shuffeledDeck = () => {
    const shuffeledCards = [...imgObj, ...imgObj]
      .sort(() => 0.5 - Math.random())
      .map((card) => ({ ...card, id: Math.random() }));
    setCards(shuffeledCards);
    setMoves(0);
  };

  // function for handling choices
  const handleChoice = (param) => {
    choiceOne ? setChoiceTwo(param) : setChoiceOne(param);
  };

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      const timer = setTimeout(() => {
        if (choiceOne.src === choiceTwo.src) {
          setCards((prev) =>
            prev.map((card) => {
              if (card.src === choiceOne.src) {
                return { ...card, matched: true };
              } else {
                return card;
              }
            })
          );
          render();
        } else {
          render();
        }
      }, 900);
      return () => clearTimeout(timer);
    }
  }, [choiceOne, choiceTwo]);

  const render = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setMoves((prev) => prev + 1);
    setDisabled(false);
  };

  // TODO --> comparing both of those choices
  // TODO --> If both choices are same, then put them in disabled states
  // TODO --> Otherwise flip back again

  useEffect(() => {
    shuffeledDeck();
  }, []);

  return (
    <div className="container">
      <h1>Memory Game</h1>
      <p>Total Moves: {moves}</p>
      <div className="grid">
        {cards.map((card) => (
          <SingleCard
            card={card}
            key={card.id}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
    </div>
  );
}

export default App;

// useEffect
