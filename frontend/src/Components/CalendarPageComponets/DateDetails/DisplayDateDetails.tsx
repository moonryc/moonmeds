import React, { useContext, useMemo } from "react";
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

  const { selectedDayDetails } = useContext(CalendarContext);
  const { putUpdateMedicationDosage } = useContext(ApiContext);

  return (
    <Box
      key={Math.random()}
      sx={{ height: "77vh", overflow: "auto", padding: "3vh" }}
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
            {selectedDayDetails.map((medicationDosage,index:number) => {
              return medicationDosage.hasBeenTaken ? (
                <div key={index}>
                  <Box
                    key={Math.random()}
                    sx={{
                      bgcolor: "green",
                      width: "100%",
                      height: 60,
                      borderRadius: 2,
                      position: "relative",
                    }}
                  >
                    <Typography
                      key={Math.random()}
                      sx={{
                        marginLeft: "1vh",
                        fontSize: "20px",
                        top: "22.5%",
                        position: "absolute",
                      }}
                    >
                      <Chip
                        sx={{ bgcolor: medicationDosage.medicationOwner.color }}
                        icon={<Face />}
                        label={medicationDosage.medicationOwner.name}
                      />
                      {" | "}
                      <Chip
                        sx={{ bgcolor: medicationDosage.medicationOwner.color }}
                        icon={<MedicationIcon />}
                        label={medicationDosage.prescriptionName}
                      />
                      {" | Dosage was taken at "}
                      {format(parseISO(medicationDosage.timeTaken), "h:mm aa")}
                    </Typography>
                    <Button
                      variant={"contained"}
                      sx={{ position: "absolute", right: "2.5%", top: "20%" }}
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
                <span key={Math.random()} />
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
            {selectedDayDetails.map((medicationDosage,index:number) => {
              return !medicationDosage.hasBeenTaken &&
                !medicationDosage.hasBeenMissed ? (
                <div key={index}>
                  <Box
                    key={Math.random()}
                    sx={{
                      bgcolor: "orange",
                      width: "100%",
                      height: 60,
                      borderRadius: 2,
                      position: "relative",
                    }}
                  >
                    <Typography
                      sx={{
                        marginLeft: "1vh",
                        fontSize: "20px",
                        top: "22.5%",
                        position: "absolute",
                      }}
                    >
                      <Chip
                        sx={{ bgcolor: medicationDosage.medicationOwner.color }}
                        icon={<Face />}
                        label={medicationDosage.medicationOwner.name}
                      />
                      {" | "}
                      <Chip
                        sx={{ bgcolor: medicationDosage.medicationOwner.color }}
                        icon={<MedicationIcon />}
                        label={medicationDosage.prescriptionName}
                      />
                      {" | Dosage to be taken at "}
                      {format(
                        parseISO(medicationDosage.timeToTake.toString()),
                        "h:mm aa"
                      ).toString()}
                    </Typography>
                    <Button
                      variant={"contained"}
                      sx={{ position: "absolute", right: "2.5%", top: "20%" }}
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
                  {/*//TODO TRAVIS ADD PADDING*/}
                </div>
              ) : (
                <span key={Math.random()} />
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
            {selectedDayDetails.map((medicationDosage,index:number) => {
              return medicationDosage.hasBeenMissed &&
                !medicationDosage.hasBeenTaken ? (
                <div key={index}>
                  <Box
                    key={Math.random()}
                    sx={{
                      bgcolor: "red",
                      width: "100%",
                      height: 60,
                      borderRadius: 2,
                      position: "relative",
                    }}
                  >
                    <Typography
                      sx={{
                        marginLeft: "1vh",
                        fontSize: "20px",
                        top: "22.5%",
                        position: "absolute",
                      }}
                    >
                      <Chip
                        sx={{ bgcolor: medicationDosage.medicationOwner.color }}
                        icon={<Face />}
                        label={medicationDosage.medicationOwner.name}
                      />
                      {" | "}
                      <Chip
                        sx={{ bgcolor: medicationDosage.medicationOwner.color }}
                        icon={<MedicationIcon />}
                        label={medicationDosage.prescriptionName}
                      />
                      {" | Dosage was missed at "}
                      {format(
                        parseISO(medicationDosage.timeToTake.toString()),
                        "h:mm aa"
                      ).toString()}
                    </Typography>
                    <Button
                      variant={"contained"}
                      sx={{ position: "absolute", right: "2.5%", top: "20%" }}
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
                <span key={Math.random()} />
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
            {selectedDayDetails.map((medicationDosage,index:number) => {
              const numberOfDaysBeforeRefill = differenceInDays(
                new Date(medicationDosage.nextFillDay),
                new Date(medicationDosage.timeToTake)
              );
              return (
                <div key={index}>
                  {numberOfDaysBeforeRefill <= 7 ? (
                    <>
                      <Box
                        key={Math.random()}
                        sx={{
                          bgcolor: "blue",
                          width: "100%",
                          height: 60,
                          borderRadius: 2,
                          position: "relative",
                        }}
                      >
                        <Typography
                          sx={{
                            marginLeft: "1vh",
                            fontSize: ".75vw",
                            top: "22.5%",
                            position: "absolute",
                          }}
                        >
                          <Chip
                            sx={{
                              bgcolor: medicationDosage.medicationOwner.color,
                            }}
                            icon={<Face />}
                            label={medicationDosage.medicationOwner.name}
                          />
                          {" | "}
                          <Chip
                            sx={{
                              bgcolor: medicationDosage.medicationOwner.color,
                            }}
                            icon={<MedicationIcon />}
                            label={medicationDosage.prescriptionName}
                          />
                          {" | refill in " +
                            differenceInDays(
                              new Date(medicationDosage.nextFillDay),
                              new Date()
                            ) +
                            " days"}
                        </Typography>
                        <Button
                          variant={"contained"}
                          sx={{
                            position: "absolute",
                            right: "2.5%",
                            top: "20%",
                          }}
                        >
                          Refill
                        </Button>
                      </Box>
                      <br />
                    </>
                  ) : (
                    <></>
                  )}
                  {/*//TODO TRAVIS ADD PADDING*/}
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
