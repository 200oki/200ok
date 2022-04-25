import { useState, useEffect } from "react";
import * as Api from "../../api";
import CelebrationComments from "./CelebrationComments";
import TodayCharacterImg from "./TodayCharacterImg";

/* 
    todayCharacter 예시 : 
        [
            {
                "id": "booker",
                "special": true,
                "name_en": "Booker",
                "name_ko": "경찰관",
                ...
                "birthday": "04-23",
                "birthday_month": 4,
                "birthday_day": 23
            },
            {
                "id": "miranda",
                "special": false,
                "name_en": "Miranda",
                "name_ko": "미란다",
                ...
                "birthday": "04-23",
                "birthday_month": 4,
                "birthday_day": 23,
                "personality": "성숙함",
                ...
            }
        ]
    villagers = ["경찰관", "미란다"]
*/

function CelebrationBtn({ todayCharacter, villagers }) {
    const [comments, setComments] = useState([]);

    async function get(villager) {
        const { data } = await Api.get(`comments/${villager}`, "today");
        return data.comments
    }
    async function getComments() {
        const data = await Promise.all(villagers.map((villager) => get(villager)));
        const commentList = data.reduce((cur, list) => [...cur, ...list], []);
        setComments([...commentList])
    }
    useEffect(() => {
        getComments();
    }, []);
    const Comments = [...comments].sort(function (a, b) {
        if (a.createdAt > b.createdAt) return 1;
        if (a.createdAt === b.createdAt) return 0;
        if (a.createdAt < b.createdAt) return -1;
    });
    const [commentShow, setCommentShow] = useState(false);
    const celebrationHandler = (e) => {
        e.preventDefault();
        if (commentShow) {
            setCommentShow(false);
        } else {
            setCommentShow(true);
        }
    };

    const countComments = Comments.length;

    return (
        <div>
            <TodayCharacterImg todayCharacter={todayCharacter} />
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "30px" }}>
                <button className="btn btn-comment" onClick={celebrationHandler}>
                    {countComments}명의 유저가 축하해주고 있어요!
                </button>
                {commentShow ? <CelebrationComments todayCharacter={todayCharacter} comments={Comments} /> : null}
            </div>
        </div>
    );
}

export default CelebrationBtn;
