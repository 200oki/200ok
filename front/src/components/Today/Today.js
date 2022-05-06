import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as Api from "../../api";
import "../../css/today.css";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CelebrationBtn from "./CelebrationBtn";
import BackButton from "../common/BackButton";
import HomeButton from "../common/HomeButton";

function Today() {
  const navigate = useNavigate()

  const today = new Date();
  // const month = today.getMonth() >= 9 ? String(today.getMonth() + 1) : '0' + String(today.getMonth() + 1);
  // const day = today.getDate() >= 10 ? String(today.getDate()) : '0' + String(today.getDate());
  const month = "08";
  const day = "23";
  const dateQuery = month + "-" + day;
  const date = { month, day };
  const fields = ["id", "name_ko", "image_photo", "image_icon"]
  const fieldsToGet = fields.join();

  const [todayCharacter, setTodayCharacter] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  async function getTodayCharacter() {
    try {
      // search api로 바꾸기
      const { data } = await Api.get(`characters/search?fields=${fieldsToGet}&props=birthday&values=${dateQuery}`);
      setTodayCharacter(data.payload);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getTodayCharacter();
  }, []);

  const handleClick = (event) => {
    event.preventDefault();
    navigate("/calendar")
  }

  const villagers = todayCharacter.map((villager) => (villager ? villager.name_ko : null));

  const villagerPhrase = `오늘은 생일인 주민이 없어요 :(`;

  if (isLoading) {
    return <div className="phrase">Loading...</div>;
  }
  return (
    <div className="today">
      <div className="nav-bar" style={{ position: "fixed", top: "0", zIndex: "1", display: "flex", flexDirection: "row", justifyContent: "space-between", width: "100vw" }}>
        <BackButton content={"메인메뉴"} destination={"explore"} />
        <HomeButton className="today-calendar" Icon={CalendarMonthIcon} onClick={handleClick} />
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
