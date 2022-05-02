import React, { useEffect, useState } from "react";
import * as Api from "../../api";
import mstyled from "../../css/match.module.css";
import TeamCard from "../TeamIntroduction/TeamCard";
import BackButton from "../common/BackButton";

const TeamIntroduction = () => {
  const [tmp, setTmp] = useState([]);

  const getChar = async () => {
    try {
      const { data } = await Api.get(
        `characters/random?size=6&fields=id%2Cname_ko%2Cimage_photo`
      );
      setTmp([...Object.values(data.payload)]);
    } catch (err) {
      console.error(err);
    }
    return () => {};
  };

  useEffect(() => {
    getChar();
  }, []);

  return (
    <div className={mstyled.Wrapper}>
      <div
        className="nav-bar"
        style={{ position: "fixed", top: "0", left: "0", zIndex: "1" }}
      >
        <BackButton content={"메인으로"} destination="explore" />
      </div>
      <div className="container2">
        <div className="card-grid2">
          {tmp.map((card, idx) => {
            return <TeamCard tmp={tmp} card={card} idx={idx} key={idx} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default TeamIntroduction;
