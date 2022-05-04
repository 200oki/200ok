import ClearIcon from '@mui/icons-material/Clear';
import { Fab } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const ExitButton = ({ Icon, className, ...other }) => {
  const navigator = useNavigate();
  const handleOnclick = other.onClick ? other.onClick : undefined;

  const styles = {
    color: "common.white",
    backgroundColor: "#ffae74",
    "&:hover": {
      backgroundColor: "#ffbe84",
    },
  };

  const goExit = () => {
    navigator("/guestbook");
  };
  return (
    <Fab
      sx={styles}
      aria-label="post"
      className={className}
      onClick={handleOnclick === undefined ? goExit : handleOnclick}
    >
      {Icon === undefined ? <ClearIcon /> : <Icon />}
    </Fab>
  );
};

export default ExitButton;
