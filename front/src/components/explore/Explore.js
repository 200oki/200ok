import React from "react";
import "../../css/explore.css";
import { Fab } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import { useStyles } from "../../utils/useStyles";
import { useNavigate } from "react-router-dom";
import StyledItem from "../StyledItem";
import { menuList } from "../../utils/util";

const Explore = () => {
  const classes = useStyles();
  const navigator = useNavigate();
  let audio1 = undefined;
  // useEffect(() => {
  //   audio1 = new Audio(
  //     "https://bobpullbucket.s3.ap-northeast-2.amazonaws.com/bgm/Main_Theme_PG.mp3"
  //   );
  // }, []);

  const styles = {
    color: "common.white",
    backgroundColor: "RGB(122,162,234)",
    "&:hover": {
      backgroundColor: "RGB(102,142,214)",
    },
  };

  // const audioClick = () => {
  //   audio1.pause();
  //   console.log("audio1");
  // };

  const backHome = () => {
    //닉네임 초기화 시키는 코드 추가 예정
    navigator("/");
  };

  const handleNavigate = (e) => {
    if (e.target.innerText === "주민퀴즈") {
      navigator("/quiz");
    } else if (e.target.innerText === "오늘의 주인공") {
      navigator("/today");
    } else if (e.target.innerText === "나와 맞는 주민 찾기") {
      navigator("/match");
    }
  };

  return (
    <div className={"root"}>
      {menuList.map((item, idx) => {
        return (
          <StyledItem
            key={idx}
            type="whiteItem"
            content={item}
            className={classes.menuItem}
            onClick={handleNavigate}
          />
        );
      })}
      <Fab
        sx={styles}
        aria-label="home"
        className={classes.fab}
        onClick={backHome}
      >
        <HomeIcon />
      </Fab>
    </div>
  );
};

export default Explore;
