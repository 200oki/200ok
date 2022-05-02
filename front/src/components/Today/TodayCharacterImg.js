function TodayCharacterImg({ todayCharacter }) {
    return (
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: "5%" }}>
            {
                todayCharacter.map((villager, index) => (
                    <img src={villager.image_photo} key={index} style={{
                        borderRadius: "50%",
                        display: "block",
                        boxShadow: "1px 2px 2px 0px rgba(0, 0, 0, 0.2)"
                    }} />
                ))
            }
        </div >
    )
}

export default TodayCharacterImg;
