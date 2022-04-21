// import { useState, useEffect, useCallback } from "react";
// import * as Api from "../../api";

function checkString(string){
    //string의 마지막 음절의 유니코드(UTF-16) 
    const charCode = string.charCodeAt(string.length - 1);
    
    //유니코드의 한글 범위 내에서 해당 코드의 받침 확인
    const consonantCode = (charCode - 44032) % 28;
    
    if(consonantCode === 0){
        //0이면 받침 없음 -> 와
        return `${string}와`;
    }
    //1이상이면 받침 있음 -> 과
    return `${string}과`;
}

function TodayPhrase({ date, todayCharacter }) {
    const Month = date[0] === '0' ? date.substr(1, 1) : date.substr(0, 2)
    const Date = date[2] === '0' ? date.substr(3, 1) : date.substr(2, 2)
    const DatePhrase = `오늘은 ${Month}월 ${Date}일!`
    const Heros = todayCharacter.length === 1 ? todayCharacter.KoreanName : todayCharacter.map((hero)=> checkString(hero.KoreanName)).join(' ').slice(0, -1);
    const HeroPhrase = `귀여운 ${Heros}의 생일이에요!`
    

    return (
        <div style ={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <p>{DatePhrase}</p>
            <p>{HeroPhrase}</p>
        </div>
    )
}

export default TodayPhrase;
