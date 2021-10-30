import React, {useEffect} from 'react';
import {DesktopTimePicker} from "@mui/lab";
import {TextField} from "@mui/material";

interface ITimePickerForDialog {
    getTime(time:Date,index:number):void
    index:number
}

const TimePickerForDialog = (props:ITimePickerForDialog) => {

    const [value, setValue] = React.useState<Date|null>(new Date());

    useEffect(() => {
        if(value == null){
            props.getTime(new Date(),props.index)
        }else{
            props.getTime(value,props.index)
        }
    }, [value]);


    return (
        <>
            <DesktopTimePicker
                label="For desktop"
                value={value}
                onChange={(newValue) => {
                    setValue(newValue);
                }}
                renderInput={(params) => <TextField fullWidth {...params} />}
            />
        </>
    );
};

export default TimePickerForDialog;
