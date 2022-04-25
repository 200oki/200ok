import { useState, useEffect } from "react";
import CelebrationBtn from "./CelebrationBtn"
import TodayPhrase from "./TodayPhrase";
import "../../css/today.css"
import * as Api from "../../api";

function Today({ today }) {
  const month = today.getMonth() >= 9 ? String(today.getMonth() + 1) : '0' + String(today.getMonth() + 1);
  const day = today.getDate() >= 10 ? String(today.getDate()) : '0' + String(today.getDate());
  const dateQuery = month + "-" + day;
  const date = { month, day };
  
  const [todayCharacter, setTodayCharacter] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  async function getTodayCharacter() {
      try {
          Api.get(`characters?birthday=${dateQuery}`)
            .then(res => res.data)
            .then(data => data.payload)
            .then(payload => Object.values(payload))
            .then(villagers => {
              setTodayCharacter([...villagers]);
              setIsLoading(false);
            })
        } catch (error) {console.error(error)}
      };
      
  useEffect(() => {
    getTodayCharacter();
  }, []);
  const villagers = todayCharacter.map((villager) => villager ? villager.name_ko : null);
  console.log("villagers", villagers)
  
  if (isLoading) {
    return <div className="phrase">Loading...</div>
  }
  return (
    <div style={{
      margin : 0,
      padding: 0,
      backgroundImage: 'url("/images/leafBgImg.jpg")',
      backgroundOpacity: "70%",
      height: "100vh",
    }}>
      <TodayPhrase 
        date={date} 
        villagers={villagers}
      />
      {villagers.length > 0 ?
        <CelebrationBtn
          todayCharacter={todayCharacter}
          villagers={villagers}
        />
        :
        <div className="phrase">
          내일 다시 와 줄래요?
        </div>
      }
    </div>
  );
}

export default Today;
