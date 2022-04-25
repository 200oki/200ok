import { useState, useEffect } from "react";
import axios from "axios"
import CelebrationComments from "./CelebrationComments";
import TodayCharacterImg from "./TodayCharacterImg";


function CelebrationBtn({ todayCharacter, villagers }) {
    const [comments, setComments] = useState([]);
    async function get( villager ) {
        try {
        axios.get(`http://localhost:5001/comments/${villager}`, {
            headers: {
            "location": "today",
            },
        })
            .then(res => res.data)
            .then(data => data.comments)
            .then(Comments => setComments([...comments, ...Comments]));
        } catch(error){console.log(error)}
    };
    async function getComments() {
        await Promise.all(villagers.map(villager=>get(villager)))
    };
    useEffect(() => {
        getComments();
    },[])
    const Comments = [...comments].sort(function(a, b){ 
        if(a.createdAt > b.createdAt) return 1; 
        if(a.createdAt === b.createdAt) return 0; 
        if(a.createdAt < b.createdAt) return -1;
     });
    const [commentShow, setCommentShow] = useState(false);
    const celebrationHandler = (e) => {
        e.preventDefault();
        if (commentShow) {
            setCommentShow(false)
        } else { setCommentShow(true) }
    }
    
    const countComments = Comments.length

    return (
        <div>
            <TodayCharacterImg todayCharacter={todayCharacter}/>
            <div style ={{display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '30px'}}>
                <button className="btn btn-comment" onClick={celebrationHandler}>{countComments}명의 유저가 축하해주고 있어요!</button>
                {commentShow
                ?
                <CelebrationComments todayCharacter={todayCharacter} comments={Comments}/>
                :
                null
                }
            </div>
        </div>
    )
}

export default CelebrationBtn;
