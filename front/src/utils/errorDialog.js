import React from 'react'
import {Box, Modal, Typography} from "@mui/material";

export const ErrorDialog = ({open, handleClose}) => {

    const modalStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };
    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={modalStyle}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        준비중 입니다...!
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        준비중 입니다...! 이전페이지로 돌아갑니다!
                    </Typography>
                </Box>
            </Modal>
        </div>
    )
}
