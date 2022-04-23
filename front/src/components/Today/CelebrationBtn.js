import { useState, useEffect, useCallback } from "react";
// import * as Api from "../../api";
import StyledItem from "../StyledItem"

function CelebrationBtn({ todayCharacter }) {
    const celebrationHandler = (e) => {
        e.preventDefault();
        
    }
    const [count, setCount] = useState(0)
    const countComments = () => {
        // 이 부분에는 db에 저장된 그 날의 댓글 수를 카운트하여 반환하는 함수 작성
        return 3
    }

    return (
        <div>
            <StyledItem type={'button'} content={`${countComments()}명의 유저가 축하해주고 있어요!`}/>
        </div>
    )
}

export default CelebrationBtn;
