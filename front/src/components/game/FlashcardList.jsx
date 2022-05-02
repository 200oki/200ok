import React, { useContext, useEffect, useState } from "react";
import FlashCard from "./Flashcard";
import "../../css/flipcard.css";
import { GameAnswerContext } from "../../context/GameAnswerContext";

const FlashcardList = ({ flashcard }) => {
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [flashCards, setFlashCards] = useState([]);

  const { answer, setAnswer } = useContext(GameAnswerContext);

  const handleChoice = (elem) => {
    if (choiceOne && choiceOne !== elem) {
      setChoiceTwo(elem);
    } else {
      setChoiceOne(elem);
    }
  };

  useEffect(() => {
    setCards();
    console.log("flashCard", flashCards);
  }, [flashcard]);

  const setCards = () => {
    const addExtended = flashcard.map((data) => {
      return { data, matched: false };
    });
    setFlashCards(addExtended);
  };

  useEffect(() => {
    console.log("one", choiceOne, "two", choiceTwo);
    if (choiceOne && choiceTwo) {
      if (choiceOne.startsWith("http") && choiceTwo.startsWith("http")) {
        return reset();
      }
      const a = choiceOne.startsWith("http")
        ? answer.filter((item) => item.name_ko === choiceTwo)
        : answer.filter((item) => item.name_ko === choiceOne);
      console.log(a);
      const nameChoice = choiceOne.startsWith("http") ? choiceTwo : choiceOne;
      const imgChoice = choiceOne.startsWith("http") ? choiceOne : choiceTwo;
      if (a[0].name_ko === nameChoice) {
        console.log("if문", a);
        //정답 비교 하기
        setFlashCards((cards) => {
          //if(정답 로직)
          console.log("test", cards);
          return cards.map((card) => {
            console.log(card);
            if (card.data === nameChoice || card.data === imgChoice) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        console.log("if문", flashCards);
        reset();
      } else {
        reset();
      }
    }
  }, [choiceOne, choiceTwo]);

  const reset = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
  };

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
