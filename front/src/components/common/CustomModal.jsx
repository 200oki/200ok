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

const CustomModal = ({ children, open, onClose, modalStyle }) => {
  const customModalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #fff",
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

export default CustomModal;
