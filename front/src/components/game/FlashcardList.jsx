import React from "react";
import FlashCard from "./Flashcard";
import "../../css/flipcard.css";
const FlashcardList = ({ flashcard }) => {
  return (
    <div className="card-grid">
      {flashcard.map((flashcard, idx) => {
        return <FlashCard flashcard={flashcard} key={idx} />;
      })}
    </div>
  );
};

export default FlashcardList;
