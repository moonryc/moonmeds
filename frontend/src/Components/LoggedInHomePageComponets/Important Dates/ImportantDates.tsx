import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {red} from "@mui/material/colors";
import {Avatar, CardHeader, Collapse} from "@mui/material";
import IconButton, {IconButtonProps} from '@mui/material/IconButton';
import {MoreVert} from "@mui/icons-material";
import {makeStyles} from "@mui/styles";
import Calendar from 'react-calendar';
import moment from "moment";
import 'react-calendar/dist/Calendar.css'

const useStyles = makeStyles((theme?: any) => ({
    title: {
        color: theme.palette.text.primary
    },
    highlight:{
        color: 'red'
    }
}));

const ImportantDates = () => {


    const mark = [
        '04-03-2020',
        '03-03-2020',
        '05-03-2020'
    ]
    const classes = useStyles();
    return (
        <div>
            {/*<Box sx={{minWidth: 275}}>*/}
                <Card variant="outlined">

                    <CardHeader
                        className={classes.title}
                        action={
                            <IconButton aria-label="settings">
                                <MoreVert/>
                            </IconButton>
                        }
                        title="Important Dates"
                    />

                    <Collapse in={true}>

                        <CardContent>
                            <Calendar
                                tileClassName="content"
                            />

                        </CardContent>
                        <CardActions>
                            <Button size="small">Learn More</Button>
                        </CardActions>
                    </Collapse>
                </Card>
            {/*</Box>*/}

        </div>
    );
};

export default ImportantDates;
