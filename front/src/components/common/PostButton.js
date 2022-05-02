import CreateIcon from '@mui/icons-material/Create';
import { Fab } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

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

  const goPost = () => {
    navigator("/guestbook/post");
  };
  return (
    <Fab
      sx={styles}
      aria-label="home"
      className={className}
      onClick={handleOnclick === undefined ? goPost : handleOnclick}
    >
      {Icon === undefined ? <CreateIcon /> : <Icon />}
    </Fab>
  );
};

export default HomeButton;
