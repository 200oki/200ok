import React, { useState, useEffect, useRef } from "react";

const FlashCard = ({ flashcard }) => {
  const [flip, setFlip] = useState(false);
  const [height, setHeight] = useState("initial");

  const frontEl = useRef();
  const backEl = useRef();
  const setMaxHeight = () => {
    const frontHeight = frontEl.current.getBoundingClientRect().height;
    const backHeight = backEl.current.getBoundingClientRect().height;
    setHeight(Math.max(frontHeight, backHeight, 150));
  };

  useEffect(setMaxHeight, [flashcard]);
  useEffect(() => {
    window.addEventListener("resize", setMaxHeight);
    return () => window.removeEventListener("resize", setMaxHeight);
  }, []);
  const handleClick = () => {
    setFlip((v) => !v);
  };

  return (
    <div
      style={{ height: height }}
      onClick={handleClick}
      className={`card ${flip ? "flip" : ""}`}
    >
      <div className="front" ref={frontEl}>
        <img src="images/leafBgImg.jpg" alt="leaf" />
      </div>
      <div className="back" ref={backEl}>
        {flashcard.startsWith("http") ? (
          <img src={flashcard} alt="characters" />
        ) : (
          <p>{flashcard}</p>
        )}
      </div>
    </div>
  );
};

export default FlashCard;
