import React, { useState, useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import * as Api from "../../api";
import "../../css/GuestPost.css";
import "moment/locale/ko";
import { GuestIdContext } from "../../context/GuestIdContext";
import { EditorState, convertToRaw } from "draft-js";
import CustomModal from "../common/CustomModal";
import { Typography } from "@mui/material";
import { useStyles } from "../../utils/useStyles";
import TextEditor from "../common/TextEditor";

const AddGuestbook = () => {
  const navigate = useNavigate();
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [modalOpen, setModalOpen] = useState(false);

  const { setId } = useContext(GuestIdContext);
  const classes = useStyles();

  const onEditorChange = (editorState) => {
    const contentState = editorState.getCurrentContent();
    setEditorState(editorState);
    console.log(contentState.hasText());
    console.log(
      "editor",
      JSON.stringify(convertToRaw(editorState.getCurrentContent()))
    );
  };

  const handleModal = () => {
    setModalOpen((v) => !v);
  };

  // 백엔드로 post 해주는 부분
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editorState.getCurrentContent().hasText()) {
      try {
        const content = JSON.stringify(
          convertToRaw(editorState.getCurrentContent())
        );

        const { data } = await Api.post("guestbooks", {
          content: content,
        });
        console.log("data.payload==========>", data.payload);
        setId(data.payload.id);
        navigate("/guestbook");
      } catch (err) {
        console.error(err);
      }
    } else {
      setModalOpen(true);
    }
  };

  return (
    <div className="guestbookPost">
      <form className="guestbookForm" onSubmit={handleSubmit}>
        <div className="contentBack">
          <div className="editorRoot">
            <TextEditor
              editorState={editorState}
              onChange={onEditorChange}
              placeholder="내용을 입력해주세요"
            />
          </div>
        </div>
        <div className="alignButton">
          <button
            type="submit"
            className="exitBtn"
            onClick={() => navigate("/guestbook")}
          >
            그만 쓸래
          </button>
          <button type="submit" className="submitBtn" onClick={handleSubmit}>
            오케이!
          </button>
        </div>
      </form>
      <CustomModal open={modalOpen} onClose={handleModal}>
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          className={classes.modalFont}
        >
          제목, 닉네임, 혹은 내용을 확인해주세요!
        </Typography>
      </CustomModal>
    </div>
  );
};

export default AddGuestbook;
