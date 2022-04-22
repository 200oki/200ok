// import { useState, useEffect, useCallback } from "react";
// import * as Api from "../../api";
// import "../StyledItem"

function TodayCharacterImg({ todayCharacter }) {
    const celebrationHandler = (e) => {
        e.preventDefault();
        
    }

    const countComments = () => {
        // 이 부분에는 db에 저장된 그 날의 댓글 수를 카운트하여 반환하는 함수 작성
        return 3
    }

    return (
        <div style ={{display: 'flex', justifyContent: 'center'}}>
            <button onClick={{celebrationHandler}}>{countComments}명의 유저가 축하해주고 있어요!</button>
        </div>
    )
}

export default TodayCharacterImg;
