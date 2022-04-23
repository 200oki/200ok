import { useState } from "react";
import CelebrationComments from "./CelebrationComments";


function CelebrationBtn({ todayCharacter }) {

    const [commentShow, setCommentShow] = useState(false);
    const celebrationHandler = (e) => {
        e.preventDefault();
        if (commentShow) {
            setCommentShow(false)
        } else { setCommentShow(true) }
    }
    
    const countComments = () => {
        // 이 부분에는 db에 저장된 그 날의 댓글 수를 카운트하여 반환하는 함수 작성
        return 3
    }

    return (
        <div style ={{display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '30px'}}>
            <button className="btn btn-comment" onClick={celebrationHandler}>{countComments()}명의 유저가 축하해주고 있어요!</button>
            {commentShow
            ?
            <CelebrationComments todayCharacter={todayCharacter}/>
            :
            null
            }
        </div>
    )
}

export default CelebrationBtn;
