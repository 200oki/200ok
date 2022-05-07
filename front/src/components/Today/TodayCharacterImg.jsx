import React from "react";
import { useNavigate } from "react-router-dom";

function TodayCharacterImg({ todayCharacter }) {
  const navigate = useNavigate();

  return (
    <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", gap: "5%" }}>
      {todayCharacter.map((villager, index) => (
        <img
          src={villager.image_photo}
          key={index}
          style={{
            width: "250px",
            height: "250px",
            borderRadius: "50%",
            display: "block",
            boxShadow: "1px 2px 2px 0px rgba(0, 0, 0, 0.2)",
            cursor: "pointer",
            transition: "all 0.5s",
          }}
          onClick={() => {
            navigate(`/detail/${villager.id}`);
          }}
          id={villager.id}
        />
      ))}
    </div>
  );
}

export default TodayCharacterImg;
