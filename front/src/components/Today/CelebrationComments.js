import { useState } from "react";
import * as Api from "../../api"

function CelebrationComments({ todayCharacter, comments, getCommentList }) {
  const Default = "images/default.png";
  const villagers = todayCharacter.map((villager) => villager.name_ko);

  const [show, setShow] = useState(false);
  const [isVillager, setIsVillager] = useState(false)
  const [menu, setMenu] = useState("주민");
  const [comment, setComment] = useState("");

  const showMenu = (event) => {
    event.preventDefault();
    if (show) {
      setShow(false);
    } else {
      setShow(true);
    }
  };

  const clickMenu = (event) => {
    event.preventDefault();
    setShow(false);
    setIsVillager(true);
    setMenu(event.target.value);
  };

  const clickHandler = async (event) => {
    event.preventDefault();
    if (menu === "주민") {
      setIsVillager(false);
      return;
    }
    const data = {
      villager: menu,
      comment: comment,
      nickname: "anonymous",
      location: "today"
    };
    try {
      await Api.post("comments", data);
      getCommentList();
      setComment("")
    } catch (error) { console.error(error) }
  };

  const inputChangeHandler = (event) => {
    setComment(event.target.value)
  };

  return (
    <div>
      <div className="submitForm">
        <div className={!isVillager ? "alert" : "noAlert"}>주민을 선택해주세요.</div>
        <form
          onSubmit={clickHandler}
          style={{ display: "flex", flexDirection: "row" }}
        >
          <button onClick={showMenu} className="dropdown">
            {menu}
          </button>
          <div className="comment">
            <input className="comment" placeholder="축하 메시지를 남겨주세요" onChange={inputChangeHandler} value={comment} />
          </div>
          <button type="submit" className="btn-comment" style={{ backgroundColor: "#A9FCCA", marginLeft: "2.5rem", width: "12rem" }}>
            축하해주기
          </button>
        </form>
        {show ? (
          <div className="menu">
            {villagers.map((villager, index) => {
              return (
                <button onClick={clickMenu} key={index} value={villager}>
                  {villager}
                </button>
              );
            })}
          </div>
        ) : null}
      </div>
      <div className="comment-section">
        {comments.map((comment, index) => {
          const villager = todayCharacter.find((villager) => villager.name_ko === comment.villager);
          const imgSrc = villager.image_icon || Default;
          return (
            <div key={index} className="comment-box">
              <img
                src={imgSrc}
                style={{
                  height: "100%",
                  borderRadius: "50%",
                }}
              />
              <div className="speech-bubble">{comment.comment}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CelebrationComments;
