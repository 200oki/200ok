import { useState, useEffect, useCallback } from "react";
import TodayCharacter from "./TodayCharacter"
import CelebrationBtn from "./CelebrationBtn"
import TodayComment from "./TodayComment"
import * as Api from "../../api";

function Today({ today }) {
  const [todayCharacter, setTC] = useState([]);
  const month = today.getMonth() >= 9 ? String(today.getMonth() + 1) : '0' + String(today.getMonth() + 1);
  const day = today.getDate() >= 10 ? String(today.getDate()) : '0' + String(today.getDate());
  const dateParam = month + day

  useEffect(() => {
    Api.get(`characters/${dateParam}`).then((res) => {
      const { data } = res;
      setTC(data);
    });
  }, []);

  return (
    <div>
      <TodayPhrase 
        date={dateParam} 
        todayCharacter={todayCharacter}
      />
      <TodayCharacter todayCharacter={todayCharacter}/>
      <CelebrationBtn />
      <TodayComment />
    </div>
  );
}

export default Today;
