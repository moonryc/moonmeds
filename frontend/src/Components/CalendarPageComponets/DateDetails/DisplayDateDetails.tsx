import React, {useContext, useEffect, useMemo, useRef, useState} from "react";
import { ICalendarDay } from "../../../../../Types/CalendarType";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Chip, Divider, List, ListItem, ListItemButton, ListItemText, ListSubheader,
  Typography,
} from "@mui/material";
import { differenceInDays, format, parseISO, toDate } from "date-fns";
import { CalendarContext } from "../../../Context/CalendarContext";
import { centeredTextStyle, titleStyle } from "../../../Styles";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Face } from "@mui/icons-material";
import MedicationIcon from "@mui/icons-material/Medication";
import { ApiContext } from "../../../Context/ApiContext";

interface IDisplayDateDetailsProp {
  selectedDate: ICalendarDay;
}

/**
 * This component displays medications that need to be taken, have been taken,
 * missed medications, and upcoming refills for a specified day
 * @param props
 * @constructor
 */
const DisplayDateDetails:React.FC<IDisplayDateDetailsProp> = ({selectedDate}) => {
  const date = useMemo(
    () => toDate(selectedDate.date).toDateString(),
    [selectedDate.date]
  );
  const [size, setSize] = useState<object>();
  const { selectedDayDetails } = useContext(CalendarContext);
  const { putUpdateMedicationDosage } = useContext(ApiContext);
  const ref = useRef({})

  const updateDimensions = () => {
    //@ts-ignore
    if (ref.current) setSize(ref.current.offsetWidth);
  };
  useEffect(() => {

    window.addEventListener("resize", updateDimensions);
    //@ts-ignore
    setSize(ref.current.offsetWidth);
    return () => {
      console.log("dismount");
      window.removeEventListener("resize", updateDimensions);
    };
  }, []);

  const truncateString = (string:string) => {
    //@ts-ignore
    if(string.length > ref.current.offsetWidth/25) {
      //@ts-ignore
      return string.slice(0, ref.current.offsetWidth/25) + "...";
    }else {
      return string;
    }
  }
return (
    <Box ref={ref}
      
      sx={{padding: "3vh", height:'100%', position:"relative"}}
    >
      <Typography variant={"h4"} sx={{ ...titleStyle, ...centeredTextStyle }}>
        {" "}
        Date Details
      </Typography>
      <Typography variant={"h5"}>{date.toString()}</Typography>
      <a href={"#section2"}> <button>test sticky 4</button></a>

      <List
          sx={{
            width: '100%',
            height: '60vh',
            bgcolor: 'background.paper',
            position: 'relative',
            overflow: 'auto',

            '& ul': { padding: 0 },
          }}
          subheader={<li />}
      >
        {[0, 1, 2, 3, 4].map((sectionId) => (
            <li key={`section-${sectionId}`}>
              <ul>
                <ListSubheader id={"section"+sectionId}>{`I'm sticky ${sectionId}`}</ListSubheader>
                <Divider/>
                {[0, 1, 2,3].map((item) => (
                    <>
                      <ListItemButton>
                    <ListItem key={`item-${sectionId}-${item}`}>
                      <ListItemText primary={`Item ${item}`} />
                    </ListItem>
                    </ListItemButton>
                    <Divider />
                    </>
                ))}
                <ListItemButton>
                  <ListItem key={`item-${sectionId}-${156}`}>
                    <ListItemText primary={`Item ${456}`} />
                  </ListItem>
                </ListItemButton>
                <Divider />
                <ListItemButton>
                  <ListItem key={`item-${sectionId}-${5615665}`}>
                    <ListItemText primary={`Item ${51561}`} />
                  </ListItem>
                </ListItemButton>
                <Divider />
                <ListItemButton>
                  <ListItem key={`item-${sectionId}-${2664865465}`}>
                    <ListItemText primary={`Item ${1566156165}`} />
                  </ListItem>
                </ListItemButton>
                <Divider />
              </ul>
            </li>
        ))}
      </List>

    </Box>
  );
};

export default DisplayDateDetails;
