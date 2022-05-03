import React from "react";
import mstyled from "../../css/match.module.css";
import TeamCard from "../TeamIntroduction/TeamCard";
import BackButton from "../common/BackButton";

const TeamIntroduction = () => {
  const teamInfo = [
    {
      position: "Back End",
      name: "신광천",
      image: "https://acnhcdn.com/latest/NpcBromide/NpcNmlPgn01.png",
      character: "펭수",
      introduction: "따봉광천",
    },
    {
      position: "Back End",
      name: "안지우",
      image: "https://acnhcdn.com/latest/NpcBromide/NpcNmlHam01.png",
      character: "애플",
      introduction: "따봉지우",
    },
    {
      position: "Back End",
      name: "윤성준",
      image: "",
      character: "",
      introduction: "따봉성준",
    },
    {
      position: "Front End",
      name: "권민지",
      image: "https://acnhcdn.com/latest/NpcBromide/NpcNmlDuk01.png",
      character: "리처드",
      introduction: "따봉민지",
    },
    {
      position: "Front End",
      name: "이창민",
      image: "https://acnhcdn.com/latest/NpcPoster/NpcSpAlw.png",
      character: "리사",
      introduction: "따봉미니",
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
      <div
        className="nav-bar"
        style={{ position: "fixed", top: "0", left: "0", zIndex: "1" }}
      >
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
