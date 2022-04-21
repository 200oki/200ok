import { useState, useEffect, useCallback } from "react";
import TodayCharacter from "./TodayCharacter"
import CelebrationBtn from "./CelebrationBtn"
import TodayComment from "./TodayComment"
import * as Api from "../../api";

function Today({ today }) {
  const [todayCharacter, setTC] = useState([]);
  
  useEffect(() => {
    Api.get(`characters/${today}`).then((res) => {
      const { data } = res;
      setTC(data);
    });
  }, []);

  return (
    <div>
      <TodayCharacter todayCharacter={todayCharacter}/>
      <CelebrationBtn />
      <TodayComment />
    </div>
  );
}

export default Today;
