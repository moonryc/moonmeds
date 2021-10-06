import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import {CardHeader, Collapse} from "@mui/material";
import IconButton from '@mui/material/IconButton';
import {MoreVert} from "@mui/icons-material";
import {makeStyles} from "@mui/styles";
import {CalendarContainer} from "../../../Context/CalendarContext";
import DisplayCalendar from "../../CalendarPageComponets/Calendar/DisplayCalendar";

const useStyles = makeStyles((theme?: any) => ({
    title: {
        color: theme.palette.text.primary
    },
    highlight:{
        color: 'red'
    }
}));

const ImportantDates = () => {



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
                            <CalendarContainer>
                                <DisplayCalendar />
                            </CalendarContainer>
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
