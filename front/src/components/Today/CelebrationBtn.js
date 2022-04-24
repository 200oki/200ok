import { useState } from "react";
import CelebrationComments from "./CelebrationComments";


function CelebrationBtn({ todayCharacter, comments }) {

    const [commentShow, setCommentShow] = useState(false);
    const celebrationHandler = (e) => {
        e.preventDefault();
        if (commentShow) {
            setCommentShow(false)
        } else { setCommentShow(true) }
    }
    
    const countComments = comments.length

    return (
        <div style ={{display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '30px'}}>
            <button className="btn btn-comment" onClick={celebrationHandler}>{countComments}명의 유저가 축하해주고 있어요!</button>
            {commentShow
            ?
            <CelebrationComments todayCharacter={todayCharacter} comments={comments}/>
            :
            null
            }
        </div>
    )
}

export default CelebrationBtn;
