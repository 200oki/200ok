import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import * as Api from "../../api";
import "../../css/Board.css";
import "../../css/textEditor.css";
import { BoardPostIdContext } from "../../context/BoardPostId";
import { useStyles } from "../../utils/useStyles";
import { EditorState, convertToRaw } from "draft-js";
import TextEditor from "../common/TextEditor";
import { Typography } from "@mui/material";
import CustomModal from "../common/CustomModal";

const AddBoard = () => {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState("");
  const [title, setTitle] = useState("");
  const [fileName, setFileName] = useState("파일을 선택해 주세요.");
  const [postFiles, setPostFiles] = useState([]);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [modalOpen, setModalOpen] = useState(false);

  const { setPostId } = useContext(BoardPostIdContext);

  const classes = useStyles();

  const onEditorChange = (editorState) => {
    setEditorState(editorState);
  };

  const handleModal = () => {
    setModalOpen((v) => !v);
  };

  const fileHandler = (e) => {
    if (e.target.files.length > 1) {
      [...e.target.files].map((item) => {
        console.log("mapTest======>", item);
        setPostFiles((v) => [...v, item]);
      });
    } else {
      console.log("one fileHandle", e.target.files);
      setFileName(e.target.files[0].name);
      setPostFiles(e.target.files[0]);
    }
  };

  const handleNicknameChange = (e) => {
    setNickname(e.target.value);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    e.persist();

    if (editorState.getCurrentContent().hasText() && title && nickname) {
      const formData = new FormData();
      const content = JSON.stringify(
        convertToRaw(editorState.getCurrentContent())
      );

      postFiles.length > 1
        ? postFiles.map((item) => formData.append("images", item))
        : formData.append("images", postFiles);

      formData.append("title", title);
      formData.append("content", content);
      formData.append("nickname", nickname);

      try {
        const response = await Api.postPostsById("posts", formData, {
          headers: {
            // "Content-Type": "multipart/form-data",
            "Content-Type": "application/x-www-form-urlencoded",
          },
        });
        setPostId(response.data.payload.id);
        navigate("/board");
      } catch (err) {
        console.error(err);
      }
    } else {
      setModalOpen(true);
    }
  };

  return (
    <div className="boardPost">
      <form className="boardForm" onSubmit={onSubmit}>
        <div className="contentBack">
          <div className="input">
            <input
              value={title}
              onChange={handleTitleChange}
              placeholder="제목을 입력해주세요"
              className="inputTitle"
            />
            <input
              value={nickname}
              onChange={handleNicknameChange}
              placeholder="닉네임을 입력해주세요"
              className="inputNickname"
            />
          </div>
          {/*<textarea*/}
          {/*  className="boardTextarea"*/}
          {/*  type="text"*/}
          {/*  placeholder="내용을 입력해주세요"*/}
          {/*  value={isTyping ? content : ""}*/}
          {/*  onChange={handleContentChange}*/}
          {/*  required*/}
          {/*/>*/}
          <div className="editorRoot">
            <TextEditor
              editorState={editorState}
              onChange={onEditorChange}
              placeholder="내용을 입력해주세요"
            />
          </div>

          <div className="imageForm">
            <label className="inputFileButton" htmlFor="files">
              업로드
            </label>
            <input
              className={classes.inputVal}
              type="text"
              value={fileName}
              disabled
            />
            <input
              style={{ display: "none" }}
              name="files"
              id="files"
              multiple
              type="file"
              onChange={fileHandler}
              accept={"image/*"}
            />
          </div>
        </div>

        {fileName.length > 0 ? (
          fileName.length > 1 ? (
            <div className="alignButton">
              <button
                type="submit"
                className="exitBtn"
                onClick={() => navigate("/board")}
              >
                그만 쓸래
              </button>
              <button type="submit" className="submitBtn">
                오케이!
              </button>
            </div>
          ) : (
            <></>
          )
        ) : null}
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

export default AddBoard;
