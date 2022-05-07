import React from "react";
import { useNavigate } from "react-router-dom";
import * as Api from "../../api";
import "../../css/today.css";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import CelebrationBtn from "./CelebrationBtn";
import BackButton from "../common/BackButton";
import HomeButton from "../common/HomeButton";
import { DateContext } from "../../context/DateContext";

function Today() {
  const navigate = useNavigate();
  const { date, setDate } = React.useContext(DateContext);

  const fieldsToGet = ["id", "name_ko", "image_photo", "image_icon"].join();

  const [todayCharacter, setTodayCharacter] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  async function getTodayCharacter() {
    try {
      const month = String(date.month).padStart(2, "0");
      const day = String(date.day).padStart(2, "0");
      const { data } = await Api.get(`characters/search?fields=${fieldsToGet}&props=birthday&values=${month}-${day}`);
      setTodayCharacter(data.payload);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  }

  React.useEffect(() => {
    getTodayCharacter();
    return () => {
      const today = new Date(); // 오늘 날짜
      const nowMonth = String(today.getMonth() + 1).padStart(2, "0");
      const nowDay = String(today.getDate()).padStart(2, "0");
      setDate({
        month: nowMonth,
        day: nowDay,
      });
    };
  }, []);

  const handleClick = () => {
    navigate("/calendar");
  };

  const villagers = todayCharacter.map((villager) => (villager ? villager.name_ko : null));

  const villagerPhrase = `오늘은 생일인 주민이 없어요 :(`;

  if (isLoading) {
    return <div className="phrase">Loading...</div>;
  }
  return (
    <div className="today">
      <div
        className="nav-bar"
        style={{ position: "fixed", top: "0", zIndex: "1", display: "flex", flexDirection: "row", justifyContent: "space-between", width: "100vw" }}
      >
        <BackButton content={"메인메뉴"} destination={"explore"} />
        <HomeButton className="today-calendar" Icon={CalendarMonthIcon} onClick={handleClick} />
      </div>
      <div className="today-content">
        {villagers.length > 0 ? (
          <CelebrationBtn date={date} todayCharacter={todayCharacter} villagers={villagers} />
        ) : (
          <div className="phrase" style={{ top: "33%" }}>
            <p>{`오늘은 ${parseInt(date.month)}월 ${parseInt(date.day)}일!`}</p>
            <p>{villagerPhrase}</p>
            <p>내일 다시 와 줄래요?</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Today;
