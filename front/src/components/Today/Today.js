import { useState, useEffect } from "react";
import CelebrationBtn from "./CelebrationBtn";
import TodayPhrase from "./TodayPhrase";
import "../../css/today.css";
import * as Api from "../../api";

function Today({ today }) {
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

  if (isLoading) {
    return <div className="phrase">Loading...</div>;
  }
  return (
    <div className="today">
      <div className="today-content">
        <TodayPhrase date={date} villagers={villagers} />
        {villagers.length > 0 ? <CelebrationBtn todayCharacter={todayCharacter} villagers={villagers} /> : <div className="phrase">내일 다시 와 줄래요?</div>}
      </div>
    </div>
  );
}

export default Today;
