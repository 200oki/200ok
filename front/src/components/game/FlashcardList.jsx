import React, { useEffect, useState } from "react";
import FlashCard from "./Flashcard";
import "../../css/flipcard.css";
const FlashcardList = ({ flashcard }) => {
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [flashCards, setFlashCards] = useState([]);

  const handleChoice = (elem) => {
    if (choiceOne && choiceOne !== elem) {
      setChoiceTwo(elem);
    } else {
      setChoiceOne(elem);
    }
  };

  useEffect(() => {
    setCards();
  }, [flashcard]);

  const setCards = () => {
    const addExtended = flashcard.map((data) => ({
      data,
      matched: false,
    }));
    setFlashCards(addExtended);
  };

  useEffect(() => {
    console.log("one", choiceOne, "two", choiceTwo);
    if (choiceOne && choiceTwo) {
      //정답 비교 하기
      setFlashCards((cards) => {
        //if(정답 로직)
      });
    }
  }, [choiceOne, choiceTwo]);

  return (
    <div className="card-grid">
      {flashCards.map((flashCard, idx) => {
        return (
          <FlashCard
            handleChoice={handleChoice}
            flashcard={flashCard}
            key={idx}
          />
        );
      })}
    </div>
  );
};

export default FlashcardList;
