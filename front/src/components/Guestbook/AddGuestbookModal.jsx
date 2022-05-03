import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { Box, Modal, Typography } from "@mui/material";
import { useStyles } from "../../utils/useStyles";

import "../../css/GuestPost.css";

const AddGuestbookModal = () => {
  const classes = useStyles();

  return (
    <div className="guestbookPostBg">
      <Box className="modalBg">
        <Typography
          id="modal-modal-title"
          variant="h6"
          className={classes.modalFont}
        >
          <textarea>
            내용을 입력해주세요.
          </textarea>
          <button>
            오케이!
          </button>
        </Typography>
      </Box>
    </div>
  );
}

export default AddGuestbookModal;