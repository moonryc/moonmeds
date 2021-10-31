import React, { useEffect } from "react";
import { DatePicker } from "@mui/lab";
import { TextField } from "@mui/material";

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
}

/**
 * This is the logic for the Date picker for the medication creation/edit dialog box
 * @param props
 * @constructor
 */
const DatePickerForDialog = (props: IDatePickerForDialogProps) => {
  const [value, setValue] = React.useState<Date | null>(null);

  useEffect(() => {
    if (props.isGetEndDate) {
      props.getEndDate(value);
    }
    if (props.isMonthly) {
      props.getMonthlyDate(value, props.index);
    }
    if (props.isRefill) {
      props.getRefillDate(value);
    }
  }, [value]);

  return (
    <>
      <DatePicker
        label={props.label}
        value={value}
        disabled={props.disable}
        onChange={(newValue) => {
          setValue(newValue);
        }}
        renderInput={(params) => <TextField fullWidth {...params} />}
      />
    </>
  );
};

export default DatePickerForDialog;
