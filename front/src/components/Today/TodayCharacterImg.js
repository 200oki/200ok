// import { useState, useEffect, useCallback } from "react";
// import * as Api from "../../api";

function TodayCharacterImg({ todayCharacter }) {

    return (
        <div style ={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: "10px"}}>
            {todayCharacter.map(( villager, index ) => (
                <img src={villager.image_photo} key={index} style={{
                    borderRadius: "50%",
                    display: "block"
                  }}/>
            ))}
        </div>
    )
}

export default TodayCharacterImg;
