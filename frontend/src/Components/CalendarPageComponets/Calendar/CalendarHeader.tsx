import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { IconButton, Typography } from "@mui/material";
import React from "react";
import { centeredTextStyle, subTextStyle } from "../../../Styles";

interface ICalendarHeaderProps {
  goForwardAMonth(): void;
  goBackAMonth(): void;
  month: Date;
}

const CalendarHeader = (props: ICalendarHeaderProps) => {
  return (
    <Typography
      sx={{
        ...centeredTextStyle,
        textAlign: ["right", "right", "right", "center"],
        fontSize: ["2vw"],
      }}
    >
      <IconButton onClick={() => props.goBackAMonth()}>
        <ArrowBack sx={{ ...subTextStyle, fontSize: ["2vw"] }} />
      </IconButton>
      <>{props.month.toDateString()}</>
      <IconButton onClick={() => props.goForwardAMonth()}>
        <ArrowForward sx={{ ...subTextStyle, fontSize: ["2vw"] }} />
      </IconButton>
    </Typography>
  );
};

export default CalendarHeader;
