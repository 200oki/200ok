import React, { useState, useEffect, useRef, useContext } from "react";
import { GameContext } from "../../context/GameContext";

const FlashCard = ({
  flashcard,
  handleChoice,
  isTwoSelected,
  setIsTwoSelected,
}) => {
  const [flip, setFlip] = useState(false);
  const [height, setHeight] = useState("initial");
  const { matchedTotal, setMatchedTotal } = useContext(GameContext);

  const frontEl = useRef();
  const backEl = useRef();
  const setMaxHeight = () => {
    const frontHeight = frontEl.current.getBoundingClientRect().height;
    const backHeight = backEl.current.getBoundingClientRect().height;
    setHeight(Math.max(frontHeight, backHeight, 150));
  };

  useEffect(() => {
    setFlip(false);
  }, [matchedTotal]);
  useEffect(setMaxHeight, [flashcard]);
  const flipTimer = () => {
    const timer = setTimeout(() => {
      setFlip(false);
      setIsTwoSelected(false);
    }, 500);
  };
  //컨텍스트에서 isTwo 만들고 참조해보기
  useEffect(() => {
    console.log("isTwoSelected", isTwoSelected);

    if (isTwoSelected) {
      flipTimer();
    }
    return () => window.clearTimeout(flipTimer);
  }, [isTwoSelected]);

  useEffect(() => {
    window.addEventListener("resize", setMaxHeight);
    return () => window.removeEventListener("resize", setMaxHeight);
  }, []);

  const handleClick = (e) => {
    setFlip((v) => !v);
    if (e.target.nextSibling && e.target.className !== "card flip") {
      if (e.target.nextSibling.querySelector(".characterImg")) {
        // front card div선택 시 back img src 가져오기
        handleChoice(e.target.nextSibling.querySelector(".characterImg").src);
      } else {
        //front card div선택 시 back 텍스트 선택
        handleChoice(e.target.nextSibling.innerText);
      }
    } else if (e.target.className === "frontLeaf") {
      if (e.target.parentElement.nextSibling.innerText) {
        handleChoice(e.target.parentElement.nextSibling.innerText);
      } else {
        handleChoice(
          e.target.parentElement.nextSibling.querySelector(".characterImg").src
        );
      }
    }
  };

  return (
    <div
      style={{ height: height }}
      onClick={handleClick}
      className={`card ${flashcard.matched ? "correct flip" : ""} ${
        flip ? "flip" : ""
      }`}
    >
      <div className="front" ref={frontEl}>
        <img src="images/cardFront.png" alt="leaf" className="frontLeaf" />
      </div>
      <div className="back" ref={backEl}>
        {flashcard.data.startsWith("http") ? (
          <img src={flashcard.data} alt="characters" className="characterImg" />
        ) : (
          <p>{flashcard.data}</p>
        )}
      </div>
    </div>
  );
};

export default FlashCard;
