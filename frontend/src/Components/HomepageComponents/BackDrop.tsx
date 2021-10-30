import React from 'react';
import BackDropImg from '../../Images/Homepage/BackDropImg.png';
import {Box, CardMedia} from "@mui/material";


/**
 * This is logic for the homepage backdrop
 * @constructor
 */
const BackDrop: React.FC<{[key: string]: any}> = () => {
    return(
       <Box
           sx={{
               flex: 1,
               bgcolor: 'background.default',
               width: '100%',
               height: '90%'
            }}
       >
       <CardMedia
           sx={{opacity:'.5'}}
           component="img"
           height="100%"
           width='100%'
           image={BackDropImg}
           alt="Paella dish"
       />

       </Box>
   )
}

export default BackDrop;