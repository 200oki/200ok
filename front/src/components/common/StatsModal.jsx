import { Box, Modal } from "@mui/material";
import React from "react";

/**
 *
 * @param children
 * @param open
 * Modal open Handler
 * @param onClose
 * Modal close Handler
 * @param modalStyle
 * Modal Styling
 */

const StatsModal = ({ children, open, onClose, modalStyle }) => {
  const customModalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 800,
    bgcolor: "background.paper",
    borderRadius: "20px",
    fontFamily: "TmoneyRoundWindRegular !important",
    fontSize: "1.2rem",
    boxShadow: 24,
    p: 4,
    outline: "none",
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={modalStyle ? modalStyle : customModalStyle}>{children}</Box>
    </Modal>
  );
};

export default StatsModal;
