import { useStyles } from "../../utils/useStyles";
import "../../css/GameIntro.css";
import { useNavigate } from "react-router-dom";
import styled from "../../css/match.module.css";

const GameResult = () => {
  const classes = useStyles();
  const navigator = useNavigate();

  const handleClick = () => {
    navigator("/match-test");
  };

  return (
    <div className="gameResultRoot">
      <img
        src="/images/kk.png"
        alt="kk"
        className={`gameIntroImg ${styled.fadeInImg}`}
      />

      <div className={"gameIntroComment"}>
        <img src="/images/kk_rm.png" alt="comment" />
        <img
          className={`${classes.introBottomArrow2} blinkImg`}
          src="/images/triangleBottomArrow.png"
          alt="arrow"
        />
      </div>
      <div className="btnWrapper">
        <button onClick={handleClick}>게임 시작</button>
      </div>
    </div>
  );
};

export default GameResult;
