import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { Fab } from "@mui/material";
import React from "react";
import { useStyles } from "../../utils/useStyles";

const TopButton = ({ goToPosition }) => {
  const classes = useStyles();

  const styles = {
    bottom: "30px",
    color: "common.white",
    backgroundColor: "#ffae74",
    "&:hover": {
      backgroundColor: "#ffbe84",
    },
  };

  return (
    <Fab
      sx={styles}
      aria-label="arrow"
      className={classes.topBtn}
      onClick={goToPosition}
    >
      <ArrowUpwardIcon />
    </Fab>
  );
};

export default TopButton;
