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

function TodayPhrase({ date, villagers }) {
    const Month = parseInt(date.month);
    const Date = parseInt(date.day);
    const datePhrase = `오늘은 ${Month}월 ${Date}일!`

    const rhetoric = ['귀여운', '사랑스러운', '예쁜', '깜찍한', '앙증맞은', '멋진']
    const adjective = rhetoric[Math.floor(Math.random() * rhetoric.length)]

    if (villagers.length > 0) {
        const heroes = villagers.length === 1 ? villagers : villagers.map((hero)=> checkString(hero)).join(' ').slice(0, -1);
        const villagerPhrase = `${adjective} ${heroes}의 생일이에요!`

        return (
            <div className="phrase">
                <p>{datePhrase}</p>
                <p>{villagerPhrase}</p>
            </div>
        )
    }
    const villagerPhrase = `오늘은 생일인 주민이 없어요 :(`
    return (
        <div className="phrase">
            <p>{datePhrase}</p>
            <p>{villagerPhrase}</p>
        </div>
    )
}

export default TodayPhrase;
