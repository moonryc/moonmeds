import React from 'react';
import {Box, makeStyles} from "@material-ui/core";
import BackDropImg from '../../Images/Homepage/BackDropImg.png';

const useStyles = makeStyles((theme?: any) => ({

    boxFilter: {
        height: '100%',
        backgroundColor: theme.palette.primary.main
    },
    imgFilter:{
        opacity: .5,
        height: '100%',
    }
}));
const BackDrop: React.FC<{[key: string]: any}> = () => {
    const classes = useStyles()
    return(
       <Box className={classes.boxFilter}>
           <img src={BackDropImg} className={classes.imgFilter} alt='BackDropImg'/>
       </Box>
   )
}

export default BackDrop;