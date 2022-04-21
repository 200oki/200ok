import {makeStyles} from "@mui/styles";

export const useStyles = makeStyles({
    ivoryItem: {
        border: "1.2px #c0dbdd solid",
        color: 'black',
        padding: '10px',
        fontSize: '1.23rem',
        lineHeight: '1.2em',
        borderRadius: '25px',
        textAlign: 'center',
        cursor: 'pointer',
        width: '25%',
        height: '45px',
        boxShadow: '1px 3px 2px 1px rgba(25, 25, 25, .2)',
        backgroundColor: '#fff9e4',
        fontFamily: 'TmoneyRoundWindExtraBold',
        '&:hover':{
            backgroundColor: '#cdcdcd',
        },
    },
    whiteItem: {
        border: "1.2px #f1f3f3 solid",
        color: 'black',
        padding: '10px',
        fontSize: '1.23rem',
        lineHeight: '1.2em',
        borderRadius: '25px',
        textAlign: 'center',
        cursor: 'pointer',
        width: '25%',
        height: '45px',
        boxShadow: '1px 3px 2px 1px rgba(25, 25, 25, .2)',
        backgroundColor: '#f1f3f3',
        fontFamily: 'TmoneyRoundWindExtraBold',
        '&:hover':{
            backgroundColor: '#cdcdcd',
        },
    },
    startBtn: {
        display: 'block !important',
        margin: 'auto !important',
        marginTop: '180px !important'
    },
})