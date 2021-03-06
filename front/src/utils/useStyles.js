import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles({
  ivoryItem: {
    border: "none",
    color: "#7c6839",
    padding: "10px",
    fontSize: "1.23rem",
    lineHeight: "1.2em",
    borderRadius: "25px",
    textAlign: "center",
    cursor: "pointer",
    width: "25%",
    height: "50px",
    boxShadow: "1px 3px 2px 1px rgba(25, 25, 25, .2)",
    backgroundColor: "#fff9e4",
    fontFamily: "TmoneyRoundWindExtraBold",
    transition: "transform 250ms",
    "&:hover": {
      backgroundColor: "#e6ddc6",
      transform: "translateY(-0.25em)",
      border: "none",
    },
  },
  whiteItem: {
    border: "1.2px #f1f3f3 solid",
    color: "black",
    padding: "10px",
    fontSize: "1.23rem !important",
    lineHeight: "2.3em !important",
    borderRadius: "25px",
    textAlign: "center",
    cursor: "pointer",
    width: "25%",
    height: "45px",
    boxShadow: "1px 3px 2px 1px rgba(25, 25, 25, .2)",
    backgroundColor: "#f1f3f3",
    fontFamily: "TmoneyRoundWindExtraBold !important",
    transition: "transform 250ms",
    "&:hover": {
      backgroundColor: "#cdcdcd",
      transform: "translateY(-0.25em)",
      border: "1.2px #cdcdcd solid",
    },
  },
  startBtn: {
    display: "block !important",
    margin: "auto !important",
    marginTop: "180px !important",
  },
  fab: {
    top: "30px",
    position: "fixed !important",
    right: "50px !important",
    margin: "auto !important",
  },
  menuItem: {
    width: "320px",
  },
  statMenuItem: {
    width: "200px",
  },
  navBar: { position: "fixed", top: "0", left: "0", zIndex: "1" },
  quizRoot: {
    height: "100%",
    justifyContent: "center",
    overflow: "hidden",
    position: "relative",
    zIndex: "1",
    "&:after": {
      height: "100%",
      width: "100%",
      top: "0",
      left: "0",
      backgroundImage: "url(/images/leafBgImg.png)",
      position: "absolute",
      content: '""',
      opacity: "0.4",
      zIndex: "-1",
    },
  },
  quizName: {
    fontFamily: "TmoneyRoundWindExtraBold !important",
    fontSize: "1.45em !important",
    marginTop: "30px !important",
    cursor: "pointer",
    marginLeft: "30px !important",
    height: "auto",
  },
  leftArrow: {
    left: "20px",
    top: "30px",
    position: "relative",
    backgroundColor: "#826449",
    lineHeight: "40px",
    marginBottom: "20px",
    textAlign: "center",
    color: "#fff",
    width: "240px",
    height: "40px",
    "&:before": {
      content: "",
      position: "absolute",
      left: "-20px",
      top: "0",
      borderTop: "20px solid transparent",
      borderBottom: "20px solid transparent",
      borderRight: "20px solid #826449",
    },
  },
  quizContent: {
    textAlign: "center",
    width: "100%",
    display: "flex",
    justifyContent: "right",
    height: "25px",
  },
  view: {
    borderRadius: "100%",
    width: "50px",
    height: "50px",
    marginRight: "30px",
    marginTop: "30px !important",
    fontFamily: "TmoneyRoundWindExtraBold !important",
    textAlign: "center",
    color: "white",
    backgroundColor: "#bfbfbf",
    opacity: "0.95",
    lineHeight: "2.75em",
    cursor: "pointer",
  },
  desc: {
    justifyContent: "right",
    borderRadius: "100%",
    width: "50px",
    height: "50px",
    marginBottom: "5px",
    marginTop: "30px !important",
    fontFamily: "TmoneyRoundWindExtraBold !important",
    textAlign: "center",
    color: "white",
    backgroundColor: "#bfbfbf",
    opacity: "0.95",
    lineHeight: "2.75em",
    cursor: "pointer",
  },
  modalFont: {
    fontFamily: "TmoneyRoundWindExtraBold !important",
  },
  modalFont2: {
    fontFamily: "TmoneyRoundWindRegular",
    paddingTop: "15px",
    paddingLeft: "32px",
    paddingRight: "15px",
  },
  progressBar: {
    backgroundColor: "white",
    borderRadius: "25px",
    margin: "0 auto",
    marginTop: "20px",
    height: "10px",
    width: "80%",
  },
  inProgressBar: {
    backgroundColor: "green",
    borderRadius: "25px",
    zIndex: 999,
    width: "100%",
    height: "10px",
  },
  cardRoot: {
    width: "100%",
    height: "100%",
    margin: "0 auto",
    marginLeft: "10%",
  },
  cardSpace: {
    position: "relative",
    width: "100%",
    height: "100%",
    maxWidth: "100px",
    minWidth: "100px",
    maxHeight: "150px",
    minHeight: "100px",
    // width: "150px",
    // height: "150px",
    borderRadius: "25%",
    backgroundColor: "white",
    transition: "transform 250ms",
    marginTop: "70px",
    boxShadow: "1px 3px 2px 1px rgba(25, 25, 25, .2)",
    "&:hover": {
      transform: "translateY(-0.25em)",
      cursor: "pointer",
    },
  },
  cardItem: {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    height: "100%",
    width: "100%",
    borderRadius: "25%",
    overflow: "hidden",
    margin: "0 auto",
  },
  leaf: {
    height: "100%",
    width: "100%",
    borderRadius: "25%",
    overflow: "hidden",
    margin: "0 auto",
  },
  flipCard: {
    display: "inline-block",
    width: "37%",
  },
  wrapCard: {
    width: "24%",
    display: "inline-block",
  },
  gameResultImg: {
    top: "10%",
    height: "200px",
    position: "relative",
  },
  bottomArrow: {
    width: "80px",
    height: "80px",
    position: "absolute",
    top: "63%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  topBtn: {
    bottom: "30px",
    position: "absolute !important",
    right: "50px !important",
    margin: "auto !important",
  },
  gameIntroImg: {
    marginTop: "80px",
    height: "50%",
  },
  introBottomArrow: {
    width: "80px",
    height: "80px",
    position: "absolute",
    top: "70%",
    left: "46%",
    right: "50%",
  },
  introBottomArrow2: {
    width: "80px",
    height: "80px",
    position: "absolute",
    top: "68%",
    left: "44%",
    right: "50%",
  },
  gameResultComment: {
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
  },
  gameEndModal: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  gameEndButton: {
    marginTop: "15%",
    fontSize: "15px",
    background: "#aaefff",
    borderRadius: "50px",
    width: "150px",
    height: "60px",
    border: "none",
    boxShadow: "1px 2px 2px 0px rgba(0, 0, 0, 0.15)",
    color: "#7e725c",
    transition: "transform 250ms",
    "&:hover": {
      transform: "translateY(-0.25em)",
      cursor: "pointer",
    },
  },
  modalEndFont: {
    fontFamily: "TmoneyRoundWindExtraBold !important",
    color: "#80725a",
    fontSize: "2rem",
  },
  gameTime: {
    fontSize: "2.5rem",
    margin: "0 auto",
    textAlign: "center",
  },
  GuestContentWrapper: {
    maxHeight: "100%",
    minHeight: "100%",
    overflowY: "auto",
    display: "flex",
    fontSize: "1.3rem",
    flexDirection: "column",
    justifyContent: "end",
    alignItems: "end",
  },
  inputVal: {
    border: "1px solid #cdcdcd",
    width: "fit-content",
    textAlign: "center",
    padding: 1.5,
    height: "35px",
  },
  wrapperClass: {
    marginTop: "1rem",
    width: "800px",
    margin: "0 auto",
    marginBottom: "1rem",
  },
  editor: {
    width: "800px",
    height: "250px",
    border: " 1px solid #f1f1f1",
    borderRadius: "2px",
  },
});
