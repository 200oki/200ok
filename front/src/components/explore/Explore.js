import React from "react";
import { useStyles } from "../../utils/useStyles";
import StyledItem from "../StyledItem";
import { menuList } from "../../utils/util";
import HomeButton from "../common/HomeButton";
import { navigator } from "../../utils/navigator";
import "../../css/explore.css";

const Explore = () => {
  const classes = useStyles();

  return (
    <div className={"root"}>
      {menuList.map((item, idx) => {
        return (
          <StyledItem
            key={idx}
            type="whiteItem"
            content={item}
            className={classes.menuItem}
            onClick={navigator}
          />
        );
      })}
      <HomeButton />
    </div>
  );
};

export default Explore;
