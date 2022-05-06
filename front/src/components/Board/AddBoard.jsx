import React, { useEffect, useState, useRef, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import * as Api from "../../api";
import "../../css/Board.css";
import "../../css/textEditor.css";
import { BoardPostIdContext } from "../../context/BoardPostId";
import { useStyles } from "../../utils/useStyles";
import { EditorState, convertToRaw } from "draft-js";
import TextEditor from "../common/TextEditor";

const AddBoard = () => {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState("");
  const [title, setTitle] = useState("");
  const [fileName, setFileName] = useState("파일을 선택해 주세요.");
  const [postFiles, setPostFiles] = useState([]);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const { setPostId } = useContext(BoardPostIdContext);

  const classes = useStyles();

  const onEditorChange = (editorState) => {
    const contentState = editorState.getCurrentContent();
    setEditorState(editorState);
    console.log(contentState);
    console.log(
      "editor",
      JSON.stringify(convertToRaw(editorState.getCurrentContent()))
    );
  };

  const fileHandler = (e) => {
    if (e.target.files.length > 1) {
      // setPostFiles((v) => {
      //   return [[...e.target.files].map((item) => item[0])];
      // });
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
  // const blockSubmit = (e) => {
  //   e.preventDefault();
  // };
  const handleNicknameChange = (e) => {
    setNickname(e.target.value);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    e.persist();
    if (editorState && title) {
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

      console.log("formData=====>", formData.get("images"));
      try {
        const response = await axios.post(
          "http://localhost:5001/posts",
          formData,
          {
            headers: {
              // "Content-Type": "multipart/form-data",
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        );
        setPostId(response.data.payload.id);
        navigate("/board");
      } catch (err) {
        console.error(err);
      }
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
    </div>
  );
};

export default AddBoard;
