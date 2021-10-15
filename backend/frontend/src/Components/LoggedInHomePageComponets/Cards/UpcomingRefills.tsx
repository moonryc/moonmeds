import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {Box, CardHeader, Collapse, Paper} from "@mui/material";
import IconButton from '@mui/material/IconButton';
import {MoreVert} from "@mui/icons-material";
import {makeStyles} from "@mui/styles";
import {rearPaperStyle, titleStyle, frontPaperStyle} from "../../../Styles";



const ImportantDates = () => {
    return (
        <Box
            sx={{
                marginTop: ['15px',null,null,null,null],
                marginBottom: ['15px',null,null,null,null],
                margin:[null,null,null,'2vw',null],

            }}
        >
            {/*<Box sx={{minWidth: 275}}>*/}
            <Card variant="outlined" sx={rearPaperStyle}>

                <CardHeader
                    sx={titleStyle}
                    action={
                        <IconButton aria-label="settings">
                            <MoreVert/>
                        </IconButton>
                    }
                    title="Upcoming Refills"
                />


                    <Paper sx={frontPaperStyle}>
                        <CardContent>
                            {/*TODO if nothing upcoming 'hurray you are up to date! else display upcoming refills*/}
                            <Typography> Hurray You are all up to date!</Typography>
                            <Typography> Hurray You are all up to date!</Typography>
                            <Typography> Hurray You are all up to date!</Typography>
                            <Typography> Hurray You are all up to date!</Typography>
                            <Typography> Hurray You are all up to date!</Typography>
                            <Typography> Hurray You are all up to date!</Typography>
                            <Typography> Hurray You are all up to date!</Typography>
                            <Typography> Hurray You are all up to date!</Typography>
                            <Typography> Hurray You are all up to date!</Typography>
                            <Typography> Hurray You are all up to date!</Typography>
                            <Typography> Hurray You are all up to date!</Typography>
                            <Typography> Hurray You are all up to date!</Typography>
                            <Typography> Hurray You are all up to date!</Typography>
                            <Typography> Hurray You are all up to date!</Typography>
                            <Typography> Hurray You are all up to date!</Typography>

                        </CardContent>
                    {/*<CardActions>*/}
                    {/*    <Button size="small">Learn More</Button>*/}
                    {/*</CardActions>*/}

                    </Paper>
            </Card>
            {/*</Box>*/}

        </Box>
    );
};

export default ImportantDates;
