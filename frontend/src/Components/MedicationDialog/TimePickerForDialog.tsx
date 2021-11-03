import { DesktopTimePicker } from "@mui/lab";
import { TextField } from "@mui/material";
import React, { useEffect } from "react";

interface ITimePickerForDialog {
  getTime(time: Date, index: number): void;
  index: number;
}


const TimePickerForDialog:React.FC<ITimePickerForDialog> = ({getTime,index}) => {
  const [value, setValue] = React.useState<Date | null>(new Date());

  useEffect(() => {
    if (value == null) {
      getTime(new Date(), index);
    } else {
      getTime(value, index);
    }
    //TODO: change this effect dependancy array to include "getTime"
  }, [value]);
  //TODO: ASK SARA WHY getTime SHOULD BE IN THE DEPENDENCY ARRAY

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
