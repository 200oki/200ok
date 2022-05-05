import { useState, useContext, useEffect } from "react";
import { useStyles } from "../../utils/useStyles";
import "../../css/GameResult.css";
import { Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import HomeButton from "../common/HomeButton";
import { BtnText } from "../../utils/util";
import * as Api from "../../api";
import { NicknameContext } from "../../context/NicknameContext";
import { GameContext } from "../../context/GameContext";
import { CopyToClipboard } from "react-copy-to-clipboard/src";

const GameResult = () => {
  const [gameScore, setGameScore] = useState(0);
  const [rank, setRank] = useState(0);
  const [value, setValue] = useState(window.location.href);
  const [copied, setCopied] = useState(false);

  const { id } = useParams();

  const { nickname } = useContext(NicknameContext);
  const { score, setScore } = useContext(GameContext);

  const classes = useStyles();
  const navigator = useNavigate();

  const settingDefault = (data) => {
    setGameScore(data.score);
    setRank(data.rank);
  };

  const getScoreAndRank = async () => {
    const bodyData = { nickname: nickname, score: score };
    const { data } = await Api.post("scores", bodyData);
    settingDefault(data.payload);
    return data.payload;
  };

  useEffect(() => {
    getScoreAndRank();
    return () => setScore(0);
  }, []);

  useEffect(() => {
    // 클립보드 복사기능 여기에
    console.log(document.querySelector(".copyUrl").value);
  }, [id]);

  const typoStyles = {
    fontFamily: "TmoneyRoundWindExtraBold",
    fontSize: "1.5rem",
  };
  const gameResultHandler = (e) => {
    e.preventDefault();
    if (e.target.innerText === BtnText.HOME) {
      navigator("/");
    } else if (e.target.innerText === BtnText.SHARE) {
    } else if (e.target.innerText === BtnText.RETRY) {
      navigator("/game");
    } else {
      navigator("/game-hof");
    }
  };
  return (
    <div className="gameResultRoot">
      <textarea value={window.location.href} className="copyUrl" />
      <HomeButton
        Icon={EmojiEventsIcon}
        className={classes.fab}
        onClick={gameResultHandler}
      />
      <img
        src="/images/rakun.png"
        alt="raccoon"
        className={classes.gameResultImg}
      />
      <div className="contentRoot">
        <div>
          <img
            src="/images/gameResult.png"
            alt="comment"
            className={classes.gameResultComment}
          />
          <img
            className={`${classes.bottomArrow} blinkImg`}
            src="/images/triangleBottomArrow.png"
            alt="arrow"
          />
          <Typography sx={typoStyles} variant={"body1"} className="content1">
            축하합니다!
          </Typography>
          <Typography sx={typoStyles} variant={"body1"} className="content2">
            당신의 기록은 <span className="gameResultScore">{gameScore}점</span>{" "}
            이고,
          </Typography>
          <Typography sx={typoStyles} variant={"body1"} className="content3">
            최종 순위는 <span className="gameResultRank">{rank}등</span> 입니다!
          </Typography>
        </div>

        <div className="resultBtnWrapper">
          <CopyToClipboard text={value} onCopy={() => setCopied(true)}>
            <button onClick={gameResultHandler}>공유하기</button>
          </CopyToClipboard>

          <button onClick={gameResultHandler}>홈으로</button>
          <button onClick={gameResultHandler}>다시하기</button>
        </div>
      </div>
    </div>
  );
};

export default GameResult;
