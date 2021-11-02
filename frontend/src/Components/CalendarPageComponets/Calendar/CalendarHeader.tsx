import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { IconButton, Typography } from "@mui/material";
import React from "react";
import { centeredTextStyle, subTextStyle } from "../../../Styles";

interface ICalendarHeaderProps {
  goForwardAMonth(): void;
  goBackAMonth(): void;
  month: Date;
}

const CalendarHeader:React.FC<ICalendarHeaderProps> = ({goBackAMonth,goForwardAMonth,month}) => {
  return (
    <Typography
      sx={{
        ...centeredTextStyle,
        textAlign: ["right", "right", "right", "center"],
        fontSize: ["2vw"],
      }}
    >
      <IconButton onClick={() => goBackAMonth()}>
        <ArrowBack sx={{ ...subTextStyle, fontSize: ["2vw"] }} />
      </IconButton>
      <>{month.toDateString()}</>
      <IconButton onClick={() => goForwardAMonth()}>
        <ArrowForward sx={{ ...subTextStyle, fontSize: ["2vw"] }} />
      </IconButton>
    </Typography>
  );
};

export default CalendarHeader;
