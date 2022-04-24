import { useState, useEffect } from "react";
import TodayCharacterImg from "./TodayCharacterImg"
import CelebrationBtn from "./CelebrationBtn"
import TodayPhrase from "./TodayPhrase";
import "../../css/today.css"
import * as Api from "../../api";

function Today({ today }) {
  // const month = today.getMonth() >= 9 ? String(today.getMonth() + 1) : '0' + String(today.getMonth() + 1);
  // const day = today.getDate() >= 10 ? String(today.getDate()) : '0' + String(today.getDate());
  const month = '04'
  const day = '23'
  const dateQuery = month + "-" + day;
  const date = { month, day };
  
  const [todayCharacter, setTC] = useState([]);
  useEffect(() => {
    Api.get(`characters?birthday=${dateQuery}`)
      .then((res)=> res.data)
      .then((data)=>data.payload)
      .then((payload)=> Object.values(payload))
      .then((villagers)=> setTC([...todayCharacter, ...villagers]))
  }, []);
  const [getComments, setGetComments] = useState([]);
  const villagers = todayCharacter.map((villager) => villager ? villager.name_ko : null);
  
  useEffect(()=>{ villagers.map(( villager ) => {
    Api.get(`comments/${villager}`, "today")
      .then((res)=> res.data)
      .then((data)=> data.comments)
      .then((comments) => setGetComments([...getComments, ...comments]));
  })},[]);
  getComments.sort((a, b) => a.createdAt - b.createdAt );
  

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
            todayCharacter={todayCharacter}
            comments={getComments}
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
