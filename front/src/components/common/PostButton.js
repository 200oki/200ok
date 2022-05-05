import CreateIcon from '@mui/icons-material/Create';
import { Fab } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import usePathParams from "../../utils/usePathParams";

const PostButton = ({ Icon, className, ...other }) => {
  const navigator = useNavigate();
  const pathname = usePathParams();

  const styles = {
    color: "common.white",
    backgroundColor: "#ffae74",
    "&:hover": {
      backgroundColor: "#ffbe84",
    },
  };

  const handleCheckUri = () => {
      if (pathname === "/board") {
        navigator("/board/post");
      } else if (pathname === "/guestbook") {
        navigator("/guestbook/post");
      }
    };

  return (
    <Fab
      sx={styles}
      aria-label="post"
      className={className}
      onClick={handleCheckUri}
    >
      {Icon === undefined ? <CreateIcon /> : <Icon />}
    </Fab>
  );
};

export default PostButton;
