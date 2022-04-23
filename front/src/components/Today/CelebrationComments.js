import { useState } from 'react';

function CelebrationComments ({ date, todayCharacter }) {
  
  const [show, setShow] = useState(false);
  
  const showMenu = (event) => {
    event.preventDefault();
    if (show) {
      setShow(false);
    } else {setShow(true);}
  }

  const villagers = todayCharacter.map((villager)=>villager.name_ko) 
  const [menu, setMenu] = useState("주민")

  const clickMenu = (event) => {
    event.preventDefault();
    setShow(false);
    setMenu(event.target.value);
  }

  return (
    <div>
      <div className="div-comment">
        <form onSubmit={{/** */}} style={{display: 'flex', flexDirection: 'row', marginTop: '10px'}}>
          <button onClick={showMenu} className="dropdown">
            {menu}
          </button>
          <div className="comment"><input className="comment" placeholder="축하 메시지를 남겨주세요"></input></div>
          <button type="submit" className="btn-comment" style={{backgroundColor:"#A9FCCA", marginLeft: "30px", width: "12rem"}}>축하해주기</button>
        </form>
          {
            show
              ? (
                <div className="menu">
                  {villagers.map((villager, index)=>{
                    return (
                      <button onClick={clickMenu} key={index} value={villager}>{villager}</button>
                    )
                  })}
                </div>
              )
              : (
                null
              )
          }
      </div>
      <div className="comment-section">
          {
            comments.map(( comment, index)=> {
              return (
                {}
              )
            })
          }
      </div>
    </div>
  );
}

export default CelebrationComments;