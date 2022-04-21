import { useState, useEffect, useCallback } from "react";
// import TodayCharacter from "./TodayCharacter"
// import CelebrationBtn from "./CelebrationBtn"
// import TodayComment from "./TodayComment"
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
      {KoreanName:"잭슨"},
      {KoreanName:"미야용"},
      {KoreanName:"사랑이"},
      {KoreanName:"지운"}
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
      {/* <CelebrationBtn /> */}
      {/* <TodayComment /> */}
    </div>
  );
}

export default Today;
