import { useState, useEffect, useCallback } from "react";
import TodayCharacterImg from "./TodayCharacterImg"
import CelebrationBtn from "./CelebrationBtn"
// import TodayComment from "./TodayComment"
import CelebrationComments from "./CelebrationComments"
import TodayPhrase from "./TodayPhrase";
import "../../css/today.css"
// import * as Api from "../../api";

function Today({ today }) {
  const [todayCharacter, setTC] = useState([]);
  const month = today.getMonth() >= 9 ? String(today.getMonth() + 1) : '0' + String(today.getMonth() + 1);
  const day = today.getDate() >= 10 ? String(today.getDate()) : '0' + String(today.getDate());
  const dateParam = month + day

  useEffect(() => {
    // Api.get(`characters/${dateParam}`).then((res) => {
    //   const { data } = res;
    //   setTC(data);
    // });
    const testdata = [
      {name_ko:"쭈니", image_photo:"https://acnhcdn.com/latest/NpcBromide/NpcNmlSqu17.png"},
      {name_ko:"잭슨", image_photo:"https://acnhcdn.com/latest/NpcBromide/NpcNmlCat23.png"},
      {name_ko:"시베리아", image_photo:"https://acnhcdn.com/latest/NpcBromide/NpcNmlWol06.png"},
      {name_ko:"미애", image_photo:"https://acnhcdn.com/latest/NpcBromide/NpcNmlCbr19.png"}
    ]
    setTC(testdata);
  }, []);

  return (
    <div style={{
      margin : 0,
      padding: 0,
      backgroundImage: 'url("/images/leafBgImg.jpg")',
      height: "100vh"
    }}>
      <TodayPhrase 
        date={dateParam} 
        todayCharacter={todayCharacter}
      />
      <TodayCharacterImg
        todayCharacter={todayCharacter}
      />
      <CelebrationBtn/>
      <CelebrationComments 
        date={dateParam} 
        todayCharacter={todayCharacter}
      />
    </div>
  );
}

export default Today;
