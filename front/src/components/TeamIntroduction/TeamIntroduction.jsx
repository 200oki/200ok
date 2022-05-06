import React from "react";
import mstyled from "../../css/match.module.css";
import TeamCard from "../TeamIntroduction/TeamCard";
import BackButton from "../common/BackButton";
import { useStyles } from "../../utils/useStyles";

const TeamIntroduction = () => {
  const classes = useStyles();
  const teamInfo = [
    {
      position: "Back End",
      name: "신광천",
      image: "https://acnhcdn.com/latest/NpcBromide/NpcNmlPgn01.png",
      character: "펭수",
      introduction: "따봉광천:)",
    },
    {
      position: "Back End",
      name: "안지우",
      image: "https://acnhcdn.com/latest/NpcBromide/NpcNmlHam01.png",
      character: "애플",
      introduction: "머요 왜요",
    },
    {
      position: "Back End",
      name: "윤성준",
      image: "https://acnhcdn.com/latest/NpcBromide/NpcNmlElp10.png",
      character: "티나",
      introduction: "집쓰됐",
    },
    {
      position: "Front End",
      name: "권민지",
      image: "https://acnhcdn.com/latest/NpcBromide/NpcNmlDuk01.png",
      character: "리처드",
      introduction: "딱대",
    },
    {
      position: "Front End",
      name: "이창민",
      image: "https://acnhcdn.com/latest/NpcPoster/NpcSpAlw.png",
      character: "리사",
      introduction: "힘드러?",
    },
    {
      position: "Front End",
      name: "홍지운",
      image: "https://acnhcdn.com/latest/NpcBromide/NpcNmlGoa02.png",
      character: "힘드러",
      introduction: "안힘드러",
    },
  ];

  return (
    <div className={mstyled.Wrapper}>
      <div className={classes.navBar}>
        <BackButton content={"메인으로"} destination="explore" />
      </div>
      <div className="container2">
        <div className="card-grid2">
          {teamInfo.map((card, idx) => {
            return (
              <TeamCard teamInfo={teamInfo} card={card} idx={idx} key={idx} />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TeamIntroduction;
