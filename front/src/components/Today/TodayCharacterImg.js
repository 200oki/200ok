import { useState, useEffect } from 'react';

function TodayCharacterImg({ todayCharacter, commentShow }) {
    const [divClassName, setDivClassName] = useState('presenting')
    useEffect(() => {
        if (isWriting) {
            setDivClassName('writing')
        } else {
            setDivClassName('presenting')
        }
    }, [isWriting])
    return (
        <div className={divClassName}>
            {todayCharacter.map((villager, index) => (
                <img src={villager.image_photo} key={index} style={{
                    borderRadius: "50%",
                    display: "block"
                }} />
            ))}
        </div>
    )
}

export default TodayCharacterImg;
