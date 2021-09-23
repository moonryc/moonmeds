import React from 'react';
import {Box, makeStyles} from "@material-ui/core";
import BackDropImg from '../../Images/Homepage/BackDropImg.png';

const useStyles = makeStyles((theme?: any) => ({

    boxFilter: {
        flex: 1,
        backgroundColor: theme.palette.primary.main,
        width: '100%',
        height: '90%',

    },
    imgFilter:{
        opacity: .5,
        width: '100%',
        height: '100%',
        overflow: 'hidden'
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