import "../../css/GameIntro.css";
import { useStyles } from "../../utils/useStyles";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const MatchIntro = () => {
  const classes = useStyles();
  const navigator = useNavigate();
  const typoStyles = {
    fontFamily: "TmoneyRoundWindExtraBold",
    fontSize: "1.5rem",
  };
  const handleClick = () => {
    navigator("/match-test");
  };
  return (
    <div className="gameResultRoot">
      <img
        src="images/gameIntro.png"
        className={classes.gameIntroImg}
        alt="DJ K.K"
      />
      <div className="contentRoot">
        <img
          src="images/gameIntroContent.png"
          alt="comment"
          className="gameIntroCommentImg"
        />
        <img
          className={`${classes.bottomArrow} blinkImg`}
          src="images/triangleBottomArrow.png"
          alt="arrow"
        />
        <Typography
          sx={typoStyles}
          variant={"body1"}
          className="gameIntroComment"
        >
          ♪ ~ ♪ ♪ ♪ ~ ♪ ♪
        </Typography>
        <div className="btnWrapper">
          <button className="introBtn" onClick={handleClick}>
            게임 시작
          </button>
        </div>
      </div>
    </div>
  );
};

export default MatchIntro;
