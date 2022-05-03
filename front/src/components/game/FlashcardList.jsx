import React, { useContext, useEffect, useState } from "react";
import FlashCard from "./Flashcard";
import "../../css/flipcard.css";
import { GameAnswerContext } from "../../context/GameAnswerContext";

const FlashcardList = ({ flashcard }) => {
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [isTwoSelected, setIsTwoSelected] = useState(false);
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
  const findAnswer = () => {
    const a = choiceOne.startsWith("http")
      ? answer.filter((item) => item.name_ko === choiceTwo)
      : answer.filter((item) => item.name_ko === choiceOne);
    const nameChoice = choiceOne.startsWith("http") ? choiceTwo : choiceOne;
    const imgChoice = choiceOne.startsWith("http") ? choiceOne : choiceTwo;
    if (a[0].name_ko === nameChoice && a[0].image_photo === imgChoice) {
      //정답 비교 하기
      console.log("context", a[0].name_ko, "name", nameChoice);
      setFlashCards((cards) => {
        //if(정답 로직)
        return cards.map((card) => {
          if (card.data === nameChoice || card.data === imgChoice) {
            return { ...card, matched: true };
          } else {
            return card;
          }
        });
      });
      correctReset();
    } else {
      reset();
    }
  };
  useEffect(() => {
    console.log("one", choiceOne, "two", choiceTwo);
    if (choiceOne && choiceTwo) {
      if (choiceOne.startsWith("http") && choiceTwo.startsWith("http")) {
        return reset();
      } else if (
        !choiceOne.startsWith("http") &&
        !choiceTwo.startsWith("http")
      ) {
        return reset();
      }
      findAnswer();
    }
  }, [choiceOne, choiceTwo]);

  const reset = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setIsTwoSelected(true);
  };

  const correctReset = () => {
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
            setIsTwoSelected={setIsTwoSelected}
            isTwoSelected={isTwoSelected}
            key={idx}
          />
        );
      })}
    </div>
  );
};

export default FlashcardList;
