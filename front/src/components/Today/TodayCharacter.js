import { useState, useEffect, useCallback } from "react";
import * as Api from "../../api";
import NoTodayCharacter from "./NoTodayCharacter";


function TodayCharacter({ todayCharacter }) {
    if (!todayCharacter) {
        return (
            <div>
                <NoTodayCharacter />
            </div>
        )
    }

    const characterArray = todayCharacter?.map((item) => {
        return (
          <AwardListItem
            key={item.id}
            id={item.id}
            title={item.title}
            description={item.description}
            isEditable={isEditable}
            getAwardList={getAwardList}
          />
        );
      });
      return <>{awardListArray}</>;
}

export default TodayCharacter;
