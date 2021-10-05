import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {CardHeader, Collapse} from "@mui/material";
import IconButton from '@mui/material/IconButton';
import {MoreVert} from "@mui/icons-material";
import {makeStyles} from "@mui/styles";

const useStyles = makeStyles((theme?: any) => ({
    title: {
        color: theme.palette.text.primary
    },
    cardStyle:{
        margin: '2vw'
    }
}));

const ImportantDates = () => {




    const classes = useStyles();
    return (
        <div className={classes.cardStyle}>
            {/*<Box sx={{minWidth: 275}}>*/}
            <Card variant="outlined">

                <CardHeader
                    className={classes.title}
                    action={
                        <IconButton aria-label="settings">
                            <MoreVert/>
                        </IconButton>
                    }
                    title="Upcoming Refills"
                />

                <Collapse in={true}>

                    <CardContent>
                        {/*TODO if nothing upcoming 'hurray you are up to date! else display upcoming refills*/}
                        <Typography> Hurray You are up to date on your refills.</Typography>
                        <Typography> Hurray You are up to date on your refills.</Typography>
                        <Typography> Hurray You are up to date on your refills.</Typography>
                        <Typography> Hurray You are up to date on your refills.</Typography>
                        <Typography> Hurray You are up to date on your refills.</Typography>
                        <Typography> Hurray You are up to date on your refills.</Typography>
                        <Typography> Hurray You are up to date on your refills.</Typography>
                        <Typography> Hurray You are up to date on your refills.</Typography>
                        <Typography> Hurray You are up to date on your refills.</Typography>
                        <Typography> Hurray You are up to date on your refills.</Typography>
                        <Typography> Hurray You are up to date on your refills.</Typography>
                        <Typography> Hurray You are up to date on your refills.</Typography>
                        <Typography> Hurray You are up to date on your refills.</Typography>
                        <Typography> Hurray You are up to date on your refills.</Typography>
                        <Typography> Hurray You are up to date on your refills.</Typography>

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
