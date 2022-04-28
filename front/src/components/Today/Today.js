import { useState, useEffect } from "react";
import * as Api from "../../api";
import "../../css/today.css";
import CelebrationBtn from "./CelebrationBtn";
import BackButton from "../common/BackButton";
import HomeButton from "../common/HomeButton";

function Today() {
  const today = new Date();
  const month = today.getMonth() >= 9 ? String(today.getMonth() + 1) : '0' + String(today.getMonth() + 1);
  const day = today.getDate() >= 10 ? String(today.getDate()) : '0' + String(today.getDate());
  // const month = "04";
  // const day = "23";
  const dateQuery = month + "-" + day;
  const date = { month, day };

  const [todayCharacter, setTodayCharacter] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  async function getTodayCharacter() {
    try {
      const { data } = await Api.get(`characters?birthday=${dateQuery}`);
      setTodayCharacter([...Object.values(data.payload)]);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getTodayCharacter();
  }, []);
  const villagers = todayCharacter.map((villager) => (villager ? villager.name_ko : null));

  const villagerPhrase = `오늘은 생일인 주민이 없어요 :(`;

  if (isLoading) {
    return <div className="phrase">Loading...</div>;
  }
  return (
    <div className="today">
      <div className="nav-bar" style={{ position: "fixed", top: "0", zIndex: "1" }}>
        <BackButton />
        <HomeButton />
      </div>
      <div className="today-content">
        {villagers.length > 0
          ?
          <CelebrationBtn date={date} todayCharacter={todayCharacter} villagers={villagers} />
          :
          <div className="phrase" style={{ top: "33%" }}>
            <p>{`오늘은 ${parseInt(month)}월 ${parseInt(day)}일!`}</p>
            <p>{villagerPhrase}</p>
            <p>내일 다시 와 줄래요?</p>
          </div>}
      </div>
    </div>
  );
}

export default Today;
