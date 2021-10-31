import { DesktopTimePicker } from "@mui/lab";
import { TextField } from "@mui/material";
import React, { useEffect } from "react";

interface ITimePickerForDialog {
  getTime(time: Date, index: number): void;
  index: number;
}

//TODO: same thing, make React.FC
const TimePickerForDialog = (props: ITimePickerForDialog) => {
  const [value, setValue] = React.useState<Date | null>(new Date());

  useEffect(() => {
    if (value == null) {
      props.getTime(new Date(), props.index);
    } else {
      props.getTime(value, props.index);
    }
    //TODO: change this effect dependancy array to include "getTime"
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
