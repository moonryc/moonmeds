import { Check, WatchLater, Update, AssignmentLate } from "@mui/icons-material";
import { Typography, FormGroup, FormControlLabel, Checkbox, Fab, Box } from "@mui/material";
import React from "react";

export const Filter = () => {
    return (
        <Box sx={{padding:['15px',,undefined], display:['none','block'], }}>
            <Typography variant='h4'sx={{textAlign:'center'}}>Filter</Typography>
            <FormGroup sx={{display:'flex',width:'auto', flexDirection:'row', justifyContent:"space-around"}}>
                <FormControlLabel sx={{ ml: '15px' }} control={<Checkbox icon={<Fab sx={{ bgcolor: 'white' }} size='small' ><Check /></Fab>} checkedIcon={<Fab sx={{ bgcolor: 'taken.main' }} size='small' ><Check /></Fab>} defaultChecked sx={{ color: 'white', '&.Mui-checked': { color: 'taken.main' } }} />} label="Medications Taken" />
                <FormControlLabel sx={{ ml: '15px' }} control={<Checkbox icon={<Fab sx={{ bgcolor: 'white' }} size='small' ><WatchLater /></Fab>} checkedIcon={<Fab sx={{ bgcolor: 'toTake.main' }} size='small' ><WatchLater /></Fab>} defaultChecked sx={{ color: 'white', '&.Mui-checked': { color: 'toTake.main' } }} />} label="Medications To Take" />
                <FormControlLabel sx={{ ml: '15px' }} control={<Checkbox icon={<Fab sx={{ bgcolor: 'white' }} size='small' ><Update /></Fab>} checkedIcon={<Fab sx={{ bgcolor: 'missed.main' }} size='small' ><Update /></Fab>} defaultChecked sx={{ color: 'white', '&.Mui-checked': { color: 'missed.main' } }} />} label="Missed Medications" />
                <FormControlLabel sx={{ ml: '15px' }} control={<Checkbox icon={<Fab sx={{ bgcolor: 'white' }} size='small' ><AssignmentLate /></Fab>} checkedIcon={<Fab sx={{ bgcolor: 'refills.main' }} size='small' ><AssignmentLate /></Fab>} defaultChecked sx={{ color: 'white', '&.Mui-checked': { color: 'refills.main' } }} />} label="Upcoming Refills" />
            </FormGroup>
        </Box>
    )
};