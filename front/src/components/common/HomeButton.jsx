import HomeIcon from "@mui/icons-material/Home";
import { Fab } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

/**
 * *
 * @param Icon
 * 아이콘 있으면 해당 아이콘 버튼으로 생성, 없으면 홈버튼
 * @param className
 * useStyles className / css
 * @param other
 * eventHandler
 */

const HomeButton = ({ Icon, className, ...other }) => {
  const navigator = useNavigate();
  const handleOnclick = other.onClick ? other.onClick : undefined;

  const styles = {
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
    <Fab
      sx={styles}
      aria-label="home"
      className={className}
      onClick={handleOnclick === undefined ? backHome : handleOnclick}
    >
      {Icon === undefined ? <HomeIcon /> : <Icon />}
    </Fab>
  );
};

export default HomeButton;
