import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles({
  ivoryItem: {
    border: "1.2px #c0dbdd solid",
    color: "black",
    padding: "10px",
    fontSize: "1.23rem",
    lineHeight: "1.2em",
    borderRadius: "25px",
    textAlign: "center",
    cursor: "pointer",
    width: "25%",
    height: "45px",
    boxShadow: "1px 3px 2px 1px rgba(25, 25, 25, .2)",
    backgroundColor: "#fff9e4",
    fontFamily: "TmoneyRoundWindExtraBold",
    transition: "transform 250ms",
    "&:hover": {
      backgroundColor: "#cdcdcd",
      transform: "translateY(-0.25em)",
      border: "1.2px #cdcdcd solid",
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
    position: "fixed !important",
    right: "50px !important",
    margin: "auto !important",
  },
  menuItem: {
    marginBottom: "50px !important",
    width: "320px",
    marginLeft: "50px !important",
  },
  quizRoot: {
    backgroundImage: "url(images/leafBgImg.jpg)",
    height: "100%",
    opacity: "0.8",
    justifyContent: "center",
    overflow: "hidden",
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
    fontSize: "1.75em !important",
    textAlign: "center",
    verticalAlign: "bottom",
  },
  quizContent: {
    textAlign: "center",
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    height: "fit-content",
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
  modalFont: {
    fontFamily: "TmoneyRoundWindExtraBold !important",
  },
  progressBar: {
    backgroundColor: "whitesmoke",
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
    width: "25%",
    height: "10px",
  },
  cardRoot: {
    width: "1800px",
    height: "100%",
    margin: "0 auto",
    marginLeft: "10%",
  },
  cardSpace: {
    width: "245px",
    height: "200px",
    borderRadius: "25%",
    backgroundColor: "whitesmoke",
    transition: "transform 250ms",
    marginTop: "25px",
    boxShadow: "1px 3px 2px 1px rgba(25, 25, 25, .2)",
    "&:hover": {
      transform: "translateY(-0.25em)",
      cursor: "pointer",
    },
  },
  cardItem: {
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
    width: "15%",
    height: "18%",
    padding: "30px",
  },
  wrapCard: {
    display: "inline-block",
  },
  topBtn: {
    position: "absolute !important",
    right: "50px !important",
    margin: "auto !important",
  },
});
