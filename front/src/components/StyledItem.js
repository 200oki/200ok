import {useStyles} from "../utils/useStyles";
import {Typography} from "@mui/material";

/**
 *
 * @param type
 * button --> return styled button
 * else --> return Typography
 * @param content
 * inner content
 * @param className
 * @param children
 * @returns {JSX.Element}
 * @constructor
 */
const StyledItem = ({type, content, className, ...children}) => {
    const classes = useStyles()

    return(
        type === 'button' ?
            (
                <button className={`${classes.ivoryItem} ${className}`}>
                    {content}
                </button>
            )
            :
            (
                <Typography className={`${classes.whiteItem} ${className} `} >
                    {content}
                </Typography>
            )

    )
}

export default StyledItem