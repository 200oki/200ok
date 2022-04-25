import { useState, useEffect } from 'react';

function TodayCharacterImg({ todayCharacter, isWriting }) {
    const [divClassName, setDCN] = useState('presenting')
    useEffect(() => {
        if (isWriting) {
            setDCN('writing')
        } else {
            setDCN('presenting')
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
