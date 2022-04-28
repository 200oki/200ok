import HomeIcon from "@mui/icons-material/Home";
import { Fab } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const HomeButton = ({ Icon, className }) => {
  const navigator = useNavigate();

  const styles = {
    top: "30px",
    color: "common.white",
    backgroundColor: "#ffae74",
    "&:hover": {
      backgroundColor: "#ffbe84",
    },
  };

  const backHome = () => {
    //닉네임 초기화 시키는 코드 추가 예정
    navigator("/");
  };
  return (
    <Fab sx={styles} aria-label="home" className={className} onClick={backHome}>
      {Icon === undefined ? <HomeIcon /> : <Icon />}
    </Fab>
  );
};

export default HomeButton;
