import React from "react";
import * as Api from "../../api";

function CelebrationComments({ todayCharacter, comments, getCommentList }) {
  const Default = "images/default.png";
  const villagers = todayCharacter.map((villager) => villager.name_ko);

  const [show, setShow] = React.useState(false);
  const [isVillager, setIsVillager] = React.useState(false);
  const [menu, setMenu] = React.useState("주민");
  const [comment, setComment] = React.useState("");

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
    Array.from(document.querySelectorAll("img")).map((item) => (item.className -= "refImg"));
    document.getElementById(event.target.title).className = "refImg";
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
      location: "today",
    };
    try {
      await Api.post("comments", data);
      getCommentList();
      setComment("");
    } catch (error) {
      console.error(error);
    }
  };

  const inputChangeHandler = (event) => {
    setComment(event.target.value);
  };

  const handleKeyUp = (e) => {
    if (e.key === "Enter") {
      clickHandler();
    }
  };

  return (
    <div className="comment-container">
      <div className="submitForm" style={{ display: "flex", flexDirection: "row" }}>
        <div>
          <div className={!isVillager ? "alert" : "noAlert"}>주민을 선택해주세요.</div>
          <button onClick={showMenu} className="dropdown">
            {menu}
          </button>
          {show ? (
            <div className="menu">
              {villagers.map((villager, index) => {
                return (
                  <button onClick={clickMenu} key={index} value={villager} title={todayCharacter[index].id}>
                    {villager}
                  </button>
                );
              })}
            </div>
          ) : null}
        </div>
        <form onSubmit={clickHandler} style={{ display: "flex", flexDirection: "row" }}>
          <div className="comment">
            <input className="comment" placeholder="축하 메시지를 남겨주세요" onChange={inputChangeHandler} value={comment} onKeyUp={handleKeyUp} />
          </div>
          <button type="submit" className="btn-comment" style={{ backgroundColor: "#A9FCCA", marginLeft: "2.5rem", width: "12rem", animation: "none" }}>
            축하해주기
          </button>
        </form>
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
