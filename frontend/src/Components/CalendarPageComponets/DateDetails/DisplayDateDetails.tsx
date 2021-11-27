import React, {useContext, useEffect, useMemo, useRef, useState} from "react";
import { ICalendarDay } from "../../../../../Types/CalendarType";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Chip,
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
      
      sx={{padding: "3vh", height:'100%' }}
    >
      <Typography variant={"h4"} sx={{ ...titleStyle, ...centeredTextStyle }}>
        {" "}
        Date Details
      </Typography>
      <Typography variant={"h5"}>{date.toString()}</Typography>

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Medications Taken</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography
            variant={"body2"}
            sx={{ fontSize: "25px", color: "text.primary" }}
          >
            {selectedDayDetails.map((medicationDosage,index) => {
              return medicationDosage.hasBeenTaken ? (
                <div key={index}>
                  <Box
                    sx={{
                      bgcolor: "green",
                      width: "100%",
                      height: '100%',
                      borderRadius: 2,
                      position: "relative",
                      display:'flex',
                      alignContent:'center'
                    }}
                  >
                    <Typography
                      sx={{
                        marginLeft: "1vh",
                        fontSize: "15px",
                        top: "22.5%",
                        position: "relative",
                        width:'70%',
                        flex:'1',
                        p:'12px',
                        lineHeight:'35px'

                      }}
                    >
                      <Chip
                        sx={{ bgcolor: medicationDosage.medicationOwner.color }}
                        icon={<Face />}
                        //@ts-ignore
                        label={truncateString(medicationDosage.medicationOwner.name)}
                        title={medicationDosage.medicationOwner.name}
                      />
                      {"  "}
                      <Chip
                        sx={{ bgcolor: medicationDosage.medicationOwner.color }}
                        icon={<MedicationIcon />}
                        //@ts-ignore
                        //label={medicationDosage.prescriptionName.slice(0,document.getElementById("box").parentElement.clientWidth/50)}
                         label={truncateString(medicationDosage.prescriptionName)}
                        title={medicationDosage.prescriptionName}
                      />
                      {"  Dosage was taken at "}
                      {format(parseISO(medicationDosage.timeTaken), "h:mm aa")}
                    </Typography>
                    <Button
                      variant={"contained"}
                      sx={{m:'1vw', }}
                      onClick={() =>
                        putUpdateMedicationDosage(
                          medicationDosage.dosageId,
                          false,
                          medicationDosage.hasBeenMissed,
                          new Date()
                        )
                      }
                    >
                      Undo
                    </Button>
                  </Box>

                  <br />
                </div>
              ) : (
                <span  />
              );
            })}
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Medications To Take</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography
            variant={"body2"}
            sx={{ fontSize: "25px", color: "text.primary" }}
          >
            {selectedDayDetails.map((medicationDosage,index) => {
              return !medicationDosage.hasBeenTaken &&
                !medicationDosage.hasBeenMissed ? (
                <div key={index}>
                  <Box
                    sx={{
                      bgcolor: "orange",
                      width: "100%",
                      height: '100%',
                      borderRadius: 2,
                      position: "relative",
                      display:'flex',
                      alignContent:'center'
                    }}
                  >
                    <Typography
                      sx={{
                        marginLeft: "1vh",
                        fontSize: "15px",
                        top: "22.5%",
                        position: "relative",
                        width:'70%',
                        flex:'1',
                        p:'12px',
                        lineHeight:'35px'
                      }}
                    >
                      <Chip
                        sx={{ bgcolor: medicationDosage.medicationOwner.color }}
                        icon={<Face />}
                        //@ts-ignore
                        label={truncateString(medicationDosage.medicationOwner.name)}
                        title={medicationDosage.medicationOwner.name}
                      />
                      {"  "}
                      <Chip
                        sx={{ bgcolor: medicationDosage.medicationOwner.color }}
                        icon={<MedicationIcon />}
                        //@ts-ignore
                        label={truncateString(medicationDosage.prescriptionName)}
                        title={medicationDosage.prescriptionName}
                      />
                      {" Dosage to be taken at "}
                      {format(
                        parseISO(medicationDosage.timeToTake.toString()),
                        "h:mm aa"
                      ).toString()}
                    </Typography>
                    <Button
                      variant={"contained"}
                      sx={{m:'1vw', }}
                      onClick={() =>
                        putUpdateMedicationDosage(
                          medicationDosage.dosageId,
                          true,
                          medicationDosage.hasBeenMissed,
                          new Date()
                        )
                      }
                    >
                      Mark as Taken
                    </Button>
                  </Box>
                  <br />
                </div>
              ) : (
                <span  />
              );
            })}
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Missed Medications</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography
            variant={"body2"}
            sx={{ fontSize: "25px", color: "text.primary" }}
          >
            {selectedDayDetails.map((medicationDosage,index) => {
              return medicationDosage.hasBeenMissed &&
                !medicationDosage.hasBeenTaken ? (
                <div key={index}>
                  <Box

                    sx={{
                      bgcolor: "red",
                      width: "100%",
                      height: '100%',
                      borderRadius: 2,
                      position: "relative",
                      display:'flex',
                      alignContent:'center'
                    }}
                  >
                    <Typography
                      sx={{
                        marginLeft: "1vh",
                        fontSize: "15px",
                        top: "22.5%",
                        position: "relative",
                        width:'70%',
                        flex:'1',
                        p:'12px',
                        lineHeight:'35px'


                      }}
                    >
                      <Chip
                        sx={{ bgcolor: medicationDosage.medicationOwner.color }}
                        icon={<Face />}
                        //@ts-ignore
                        label={truncateString(medicationDosage.medicationOwner.name)}
                        title={medicationDosage.medicationOwner.name}
                      />
                      {"  "}
                      <Chip
                        sx={{ bgcolor: medicationDosage.medicationOwner.color }}
                        icon={<MedicationIcon />}
                        //@ts-ignore
                        label={truncateString(medicationDosage.prescriptionName)}
                        title={medicationDosage.prescriptionName}
                      />
                      {" Dosage was missed at "}
                      {format(
                        parseISO(medicationDosage.timeToTake.toString()),
                        "h:mm aa"
                      ).toString()}
                    </Typography>
                    <Button
                      variant={"contained"}
                       sx={{m:'1vw', }}
                      onClick={() =>
                        putUpdateMedicationDosage(
                          medicationDosage.dosageId,
                          true,
                          medicationDosage.hasBeenMissed,
                          new Date()
                        )
                      }
                    >
                      Mark as taken
                    </Button>
                  </Box>
                  <br />
                </div>
              ) : (
                <span  />
              );
            })}
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Medications To Refill</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography
            variant={"body2"}
            sx={{ fontSize: "25px", color: "text.primary" }}
          >
            {selectedDayDetails.map((medicationDosage,index) => {
              const numberOfDaysBeforeRefill = differenceInDays(
                new Date(medicationDosage.nextFillDay),
                new Date(medicationDosage.timeToTake)
              );
              return (
                <div key={index}>
                  {numberOfDaysBeforeRefill <= 7 ? (
                    <>
                      <Box
                        
                        sx={{
                          bgcolor: "blue",
                          width: "100%",
                          height: '100%',
                          borderRadius: 2,
                          position: "relative",
                          display:'flex',
                          alignContent:'center'
                        }}
                      >
                        <Typography
                          sx={{
                            marginLeft: "1vh",
                            fontSize: "15px",
                            top: "22.5%",
                            position: "relative",
                            width:'70%',
                            flex:'1',
                            p:'12px',
                            lineHeight:'35px'
                          }}
                        >
                          <Chip
                            sx={{
                              bgcolor: medicationDosage.medicationOwner.color,
                            }}
                            icon={<Face />}
                            label={truncateString(medicationDosage.medicationOwner.name)}
                            title={medicationDosage.medicationOwner.name}
                          />
                          {"  "}
                          <Chip
                            sx={{
                              bgcolor: medicationDosage.medicationOwner.color,
                            }}
                            icon={<MedicationIcon />}
                            label={truncateString(medicationDosage.prescriptionName)}
                            title={medicationDosage.prescriptionName}
                          />
                          {" refill in " +
                            differenceInDays(
                              new Date(medicationDosage.nextFillDay),
                              new Date()
                            ) +
                            " days"}
                        </Typography>
                        <Button
                          variant={"contained"}
                          sx={{m:'1vw', }}
                        >
                          Refill
                        </Button>
                      </Box>
                      <br />
                    </>
                  ) : (
                    <></>
                  )}
                </div>
              );
            })}
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default DisplayDateDetails;
