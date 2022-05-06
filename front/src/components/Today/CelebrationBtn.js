import { useState, useEffect, useCallback } from "react";
import * as Api from "../../api";
import CelebrationComments from "./CelebrationComments";
import TodayCharacterImg from "./TodayCharacterImg";
import TodayPhrase from "./TodayPhrase";

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

function CelebrationBtn({ todayCharacter, villagers, date }) {
    const [comments, setComments] = useState([]);


    const getCommentList = useCallback(() => {
        async function get(villager) {
            const { data } = await Api.get(`comments?villager=${villager}&location=today`);
            return data.payload;
        }
        async function getComments() {
            const data = await Promise.all(villagers.map((villager) => get(villager)));
            const commentList = data.reduce((cur, list) => [...cur, ...list], []);
            setComments([...commentList])
        }
        getComments();
    }, []);

    useEffect(() => {
        getCommentList();
    }, [getCommentList]);

    const Comments = [...comments].sort(function (a, b) {
        if (a.createdAt > b.createdAt) return -1;
        if (a.createdAt === b.createdAt) return 0;
        if (a.createdAt < b.createdAt) return 1;
    });
    const [commentShow, setCommentShow] = useState(false);
    const celebrationHandler = (e) => {
        e.preventDefault();
        setCommentShow(!commentShow);
        Array.from(document.querySelectorAll("img")).map((item) => item.className -= "refImg")
        if (!commentShow) {
            Array.from(document.querySelectorAll("img")).map((item) => item.style.opacity = 0.4)
        } else {
            Array.from(document.querySelectorAll("img")).map((item) => item.style.opacity = 1.0)
        }
    };

    const countComments = Comments.length;

    return (
        <>
            <TodayPhrase date={date} villagers={villagers} commentShow={commentShow} />
            <div className={commentShow ? "writing" : "presenting"}>
                <TodayCharacterImg todayCharacter={todayCharacter} />
                <button className="btn-comment" onClick={celebrationHandler} style={{ marginTop: "2em" }}>
                    {countComments}명의 유저가 축하해주고 있어요!
                </button>
            </div>
            <div style={{ position: "fixed", bottom: "10%" }}>
                {commentShow ? <CelebrationComments todayCharacter={todayCharacter} comments={Comments} getCommentList={getCommentList} /> : null}
            </div>
        </>
    );
}

export default CelebrationBtn;
