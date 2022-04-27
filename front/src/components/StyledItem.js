import React, { useState } from "react";
import { useStyles } from "../utils/useStyles";
import { Typography } from "@mui/material";
import { ErrorDialog } from "../utils/errorDialog";

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

  const handleOpen = () => {
    console.log(open);
    setOpen((v) => !v);
  };

  return (
    <React.Fragment>
      {type === "button" ? (
        <React.Fragment>
          <button
            className={`${classes.ivoryItem} ${className}`}
            onClick={handleOnClick !== undefined ? handleOnClick : handleOpen}
          >
            {content}
          </button>
        </React.Fragment>
      ) : (
        <Typography
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
