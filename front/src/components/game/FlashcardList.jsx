import React, { useContext, useEffect, useState } from "react";
import FlashCard from "./Flashcard";
import "../../css/flipcard.css";
import { GameAnswerContext } from "../../context/GameAnswerContext";
import { GameContext } from "../../context/GameContext";

/**
 * @param flashcard
 * from GameItem Component
 * one card data
 * @param setIsWin
 * when you win set true
 * default false
 * @param setIsModalOpen
 * from GameItem Component
 * setModalOpen open modal in GameItem Component
 */
const FlashcardList = ({ flashcard, setIsWin, setIsModalOpen }) => {
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [isTwoSelected, setIsTwoSelected] = useState(false);
  const [flashCards, setFlashCards] = useState([]);

  const { matchedTotal, setMatchedTotal } = useContext(GameContext);
  const { answer, setAnswer } = useContext(GameAnswerContext);

  const handleChoice = (elem) => {
    if (choiceOne && choiceOne !== elem) {
      setChoiceTwo(elem);
    } else {
      setChoiceOne(elem);
    }
  };
  useEffect(() => {
    if (matchedTotal.length === 16) {
      setIsWin(true);
      setGame();
    }
  }, [matchedTotal]);

  useEffect(() => {
    setCards();
  }, [flashcard]);

  const setCards = () => {
    const addExtended = flashcard.map((data) => {
      return { data, matched: false };
    });
    setFlashCards(addExtended);
  };
  const setGame = () => {
    setMatchedTotal([]);
    setIsModalOpen(true);
  };
  const setTotal = (name, image) => {
    setMatchedTotal(() => {
      return [...matchedTotal, name, image];
    });
  };
  const findAnswer = () => {
    const a = choiceOne.startsWith("http")
      ? answer.filter((item) => item.name_ko === choiceTwo)
      : answer.filter((item) => item.name_ko === choiceOne);
    const nameChoice = choiceOne.startsWith("http") ? choiceTwo : choiceOne;
    const imgChoice = choiceOne.startsWith("http") ? choiceOne : choiceTwo;
    if (a[0].name_ko === nameChoice && a[0].image_photo === imgChoice) {
      //정답 비교 하기

      setTotal(a[0].name_ko, a[0].image_photo);

      setFlashCards((cards) => {
        //if(정답 로직)
        return cards.map((card, idx) => {
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
