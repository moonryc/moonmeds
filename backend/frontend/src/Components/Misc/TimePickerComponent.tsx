import React, {useEffect} from 'react';
import MobileTimePicker from "@mui/lab/MobileTimePicker";
import {TextField} from "@mui/material";

interface ITimePickerComponentProps {
    initialTime: Date,
    label: String,
    handleTimeOnChange: (e: any) => void
}


const TimePickerComponent = (props: ITimePickerComponentProps) => {

    const [value, setValue] = React.useState<Date>(props.initialTime);

    useEffect(() => {
        props.handleTimeOnChange(value)
    }, [value])// eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div>

                {/*<Stack spacing={3}>*/}
                <MobileTimePicker
                    label={props.label}
                    value={value}
                    onChange={(newValue) => {
                        newValue == null ? setValue(new Date()) : setValue(newValue)
                    }}
                    renderInput={(params) => <TextField size={"small"} label={"Time of Dosage"} {...params} />}
                />
                {/*</Stack>*/}

        </div>
    );
};

export default TimePickerComponent;
