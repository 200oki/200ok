import React, { useState } from "react";
import { useStyles } from "../../utils/useStyles";
import { Typography } from "@mui/material";
import { ErrorDialog } from "../../utils/errorDialog";

/**
 *
 * @param type
 * button --> return styled button
 * else --> return Typography
 * @param content
 * inner content
 * @param className
 * @param children
 * @returns {JSX.Element}
 * @constructor
 */
const StyledItem = ({ type, content, className, ...other }) => {
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const handleOnClick = other.onClick ? other.onClick : undefined;

  const typoStyles = {
    margin: "0 14px 50px 15px",
  };

  const handleOpen = () => {
    setOpen((v) => !v);
  };

  return (
    <React.Fragment>
      {type === "button" ? (
        <button
          className={`${classes.ivoryItem} ${className}`}
          onClick={handleOnClick !== undefined ? handleOnClick : handleOpen}
        >
          {content}
        </button>
      ) : (
        <Typography
          sx={typoStyles}
          className={`${classes.whiteItem} ${className} `}
          onClick={handleOnClick}
        >
          {content}
        </Typography>
      )}

      <ErrorDialog open={open} handleClose={handleOpen} />
    </React.Fragment>
  );
};

export default StyledItem;
