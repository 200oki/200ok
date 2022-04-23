import { useState, useEffect } from "react";
import TodayCharacterImg from "./TodayCharacterImg"
import CelebrationBtn from "./CelebrationBtn"
import TodayPhrase from "./TodayPhrase";
import "../../css/today.css"
import * as Api from "../../api";

function Today({ today }) {
  const [todayCharacter, setTC] = useState([]);
  const month = today.getMonth() >= 9 ? String(today.getMonth() + 1) : '0' + String(today.getMonth() + 1);
  const day = today.getDate() >= 10 ? String(today.getDate()) : '0' + String(today.getDate());
  const dateQuery = month + "-" + day;
  const date = { month, day };

  useEffect(async () => {
    const {payload} = await Api.get("characters", "", "", `birthday?${dateQuery}`);
    const data = Object.values(payload)
    setTC(data);
  }, []);
  
  const villagers = todayCharacter.map((villager) => villager ? villager.name_ko : null)
  const comments = []
  comments.push( villagers.map(async ( villager ) => {
      const { comments } = await Api.get("comments", villager, "today", "")
      return comments
    }
  ))

  return (
    <div style={{
      margin : 0,
      padding: 0,
      backgroundImage: 'url("/images/leafBgImg.jpg")',
      height: "100vh"
    }}>
      <TodayPhrase 
        date={date} 
        villagers={villagers}
      />
      {villagers.length > 0 ?
        <>
          <TodayCharacterImg
            todayCharacter={todayCharacter}
          />
          <CelebrationBtn
            date={date}
            todayCharacter={todayCharacter}
          />
        </>
        :
        <div className="phrase">
          내일 다시 와 줄래요?
        </div>
      }
    </div>
  );
}

export default Today;
