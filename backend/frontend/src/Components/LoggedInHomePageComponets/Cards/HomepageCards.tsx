import * as React from 'react';
import Grid from '@mui/material/Grid';
import ImportantDates from "./ImportantDates";
import UpcomingRefills from "./UpcomingRefills";



const HomepageCards: React.FC<React.HTMLProps<HTMLDivElement>> = ({children, ...props}) => {
    return (
        <div {...props}>

                <Grid container spacing={0} alignItems="flex-end">

                    <Grid item xs={12} lg={4} >
                        <UpcomingRefills />
                    </Grid>
                    <Grid item xs={12} lg={4} >
                        <ImportantDates/>
                    </Grid>
                    <Grid item xs={12} lg={4} >
                        <UpcomingRefills/>
                    </Grid>
                </Grid>

        </div>
    );
}

export default HomepageCards