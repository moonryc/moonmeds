import React, {useEffect} from "react";
import {DatePicker} from "@mui/lab";
import {TextField} from "@mui/material";

interface IDatePickerForDialogProps {
    getEndDate(date: Date | null): void;

    getRefillDate(date: Date | null): void;

    getMonthlyDate(date: Date | null, index: number): void;

    isGetEndDate: boolean;
    disable: boolean;
    label: string;
    isMonthly: boolean;
    index: number;
    isRefill: boolean;
    datePassed:Date|null
}

/**
 * This is the logic for the Date picker for the medication creation/edit dialog box
 * @param props
 * @constructor
 */
const DatePickerForDialog: React.FC<IDatePickerForDialogProps> = (
    {
        getEndDate,
        getRefillDate,
        getMonthlyDate,
        isGetEndDate,
        disable,
        label,
        isMonthly,
        index,
        isRefill,
        datePassed
    }
) => {

    const [value, setValue] = React.useState<Date|null>(datePassed);

    useEffect(() => {
            setValue(datePassed)
    }, [datePassed]);


    useEffect(() => {
        if (isGetEndDate) {
            getEndDate(value);
        }
        if (isMonthly) {
            getMonthlyDate(value, index);
        }
        if (isRefill) {
            getRefillDate(value);
        }
    }, [value]);

    return (
        <>
            <DatePicker
                label={label}
                value={value}
                disabled={disable}
                onChange={(newValue) => {
                    setValue(newValue);
                }}
                renderInput={(params) => <TextField fullWidth {...params} value={value}/>}
            />
        </>
    );
};

export default DatePickerForDialog;
