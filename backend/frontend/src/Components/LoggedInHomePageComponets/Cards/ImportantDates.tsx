import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import {CardHeader, Collapse} from "@mui/material";
import IconButton from '@mui/material/IconButton';
import {MoreVert} from "@mui/icons-material";
import DisplayCalendar from "../../CalendarPageComponets/Calendar/DisplayCalendar";
import {titleStyle} from "../../../Styles";



const ImportantDates = () => {
    return (
        <div>
            {/*<Box sx={{minWidth: 275}}>*/}
                <Card variant="outlined" sx={{bgcolor:'primary.light'}}>

                    <CardHeader
                        sx={ titleStyle }
                        action={
                            <IconButton aria-label="settings">
                                <MoreVert/>
                            </IconButton>
                        }
                        title="Important Dates"
                    />

                    <Collapse in={true}>

                        <CardContent>
                                <DisplayCalendar />
                        </CardContent>
                        {/*<CardActions>*/}
                        {/*</CardActions>*/}
                    </Collapse>
                </Card>


        </div>
    );
};

export default ImportantDates;
