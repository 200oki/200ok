import React, { useEffect, useRef, useState } from "react";
import ReactCardFlip from "react-card-flip";
import { Typography } from "@mui/material";
import { useStyles } from "../../utils/useStyles";

const Card = ({ name, chImage }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const classes = useStyles();
  const cardStyles = {
    fontFamily: "TmoneyRoundWindExtraBold",
    lineHeight: "12rem",
  };
  const cardRef = useRef(false);

  const handleClick = (e) => {
    cardRef.current = true;
    setIsFlipped((v) => !v);
    console.log(cardRef);
  };
  const styles = {
    border: "none",
  };
  return (
    <ReactCardFlip
      containerClassName={classes.flipCard}
      isFlipped={isFlipped}
      className={"teststestsetest"}
      flipDirection="horizontal"
      ref={cardRef}
    >
      <div className={classes.cardSpace} onClick={handleClick}>
        <img
          className={classes.leaf}
          src={"images/cardFront.png"}
          alt={"card front"}
        />
      </div>
      <div className={classes.cardSpace} onClick={handleClick}>
        {name ? (
          <Typography
            sx={cardStyles}
            align="center"
            className={classes.cardItem}
          >
            {name}
          </Typography>
        ) : (
          <img className={classes.cardItem} src={chImage} alt={"card back"} />
        )}
      </div>
    </ReactCardFlip>
  );
};

export default Card;
