import { useState, useEffect, useCallback} from 'react';

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
      <form onSubmit={{/** */}}>
        <button onClick={showMenu} className="dropdown">
          {menu}
        </button>
        <input placeholder="축하 메시지를 남겨주세요"></input>
        <button type="submit">축하해주기</button>
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
      </form>
    </div>
  );
}

export default CelebrationComments;