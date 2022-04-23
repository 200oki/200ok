import { useState, useEffect, useCallback } from "react";
import * as Api from "../../api";
import CelebrationComments from "./CelebrationComments";
// post	villager, comment, location, nickname
// Get  header location -> today
// 	result : nickname, comment, 날짜

function CelebrationBtn({ todayCharacter }) {
    // const [comments, setComments] = useState([])
    // useEffect(() => {
    //     // Api.get(`comments/${todayCharacter}`).then((res) => {
    //     //   const { data } = res.comments;
    //     //   setTC(data);
    //     // });
    //     const testdata = [
    //       {name_ko:"쭈니", image_photo:"https://acnhcdn.com/latest/NpcBromide/NpcNmlSqu17.png"},
    //       {name_ko:"잭슨", image_photo:"https://acnhcdn.com/latest/NpcBromide/NpcNmlCat23.png"},
    //       {name_ko:"시베리아", image_photo:"https://acnhcdn.com/latest/NpcBromide/NpcNmlWol06.png"},
    //       {name_ko:"미애", image_photo:"https://acnhcdn.com/latest/NpcBromide/NpcNmlCbr19.png"}
    //     ]
    //     setTC(testdata);
    //   }, []);
    const [commentShow, setCommentShow] = useState(false);
    const celebrationHandler = (e) => {
        e.preventDefault();
        if (commentShow) {
            setCommentShow(false)
        } else { setCommentShow(true) }
    }
    const [count, setCount] = useState(0)
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
