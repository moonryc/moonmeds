import { ToggleButton, ToggleButtonGroup } from "@mui/lab";
import {
  Button, Collapse,
  DialogContentText,
  Divider,
  Paper,
  TextField
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { IDosagesDetails } from "../../../../Types/MedicationTypes";
import DatePickerForDialog from "./DatePickerForDialog";
import TimePickerForDialog from "./TimePickerForDialog";

/**
 * @property medication - IMedicationBase
 * @property isNewCard - boolean,
 * @property updateMedicationDosages(listOfDosages: IDosagesDetails[]) - void
 */
export interface IMedicationCardAddDosagesProps {
  medicationDosages: IDosagesDetails[];
  isNewCard: boolean;
  updateMedicationDosages(listOfDosages: IDosagesDetails[]): void;
}

///*TODO(Spotexx): theming*/
/**
 * Creates and deletes medication dosages, this component is only displayed when the medication is being edited/isNewCard is true
 * @param props - {medication: IMedicationBase, isNewCard:boolean,updateMedicationDosages(listOfDosages:IDosagesDetails[]):void}
 * @constructor
 */
const MedicationDialogDosages = (props: IMedicationCardAddDosagesProps) => {
  const [dosages, setDosages] = useState<IDosagesDetails[]>(
    props.medicationDosages
  );

  /**
   * Removes a dosage from the array of dosages at the given index
   * @param dosageIndex - number
   */
  const deleteDosage = (dosageIndex: number) => {
    if (dosages.length > 1) {
      let tempDosages = [...dosages];
      tempDosages.splice(dosageIndex, 1);
      setDosages(tempDosages);
    }
  };

  const getMonthlyDate = (monthlyDate: Date, index: number) => {
    let tempMedication = [...dosages];
    tempMedication[index].customOnceAMonthDate = monthlyDate;
    setDosages(tempMedication);
  };

  const getTime = (time: Date, index: number) => {
    let tempMedication = [...dosages];
    tempMedication[index].time = time;
    setDosages(tempMedication);
  };

  /**
   * updates the medicationDetails property in MedicationCard component when the dosages changes
   */
  useEffect(() => {
    props.updateMedicationDosages(dosages);
  }, [dosages]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <DialogContentText>Dosages</DialogContentText>
      <br />
      {dosages.map((dose, index) => {
        return (
          <>
            <TextField
              fullWidth
              variant={"outlined"}
              type={"number"}
              label={"Dosage"}
              value={dose.amount}
              onChange={(e) => {
                let tempArray = [...dosages];
                tempArray[index].amount = parseFloat(e.target.value);
                setDosages(tempArray);
              }}
            />
            <br />
            <br />
            <TimePickerForDialog getTime={getTime} index={index} />
            <br />
            <br />
            <Paper>
              <ToggleButtonGroup fullWidth exclusive>
                <ToggleButton
                  value={"Daily"}
                  selected={dosages[index].isDaily}
                  onClick={() => {
                    let tempArray = [...dosages];
                    tempArray[index].isDaily = true;
                    tempArray[index].isWeekly = false;
                    tempArray[index].isOnceAMonth = false;
                    setDosages(tempArray);
                  }}
                >
                  Daily
                </ToggleButton>
                <ToggleButton
                  value={"Weekly"}
                  selected={dosages[index].isWeekly}
                  onClick={() => {
                    let tempArray = [...dosages];
                    tempArray[index].isDaily = false;
                    tempArray[index].isWeekly = true;
                    tempArray[index].isOnceAMonth = false;
                    setDosages(tempArray);
                  }}
                >
                  Weekly
                </ToggleButton>
                <ToggleButton
                  value={"Monthly"}
                  selected={dosages[index].isOnceAMonth}
                  onClick={() => {
                    let tempArray = [...dosages];
                    tempArray[index].isDaily = false;
                    tempArray[index].isWeekly = false;
                    tempArray[index].isOnceAMonth = true;
                    setDosages(tempArray);
                  }}
                >
                  Monthly
                </ToggleButton>
              </ToggleButtonGroup>
            </Paper>
            <br />
            <br />
            <Collapse in={dose.isWeekly}>
              <Paper>
                <ToggleButtonGroup fullWidth disabled={!dose.isWeekly}>
                  <ToggleButton
                    value={"Sunday"}
                    selected={dose.customWeekDays.sunday}
                    onClick={() => {
                      let tempArray = [...dosages];
                      tempArray[index].customWeekDays.sunday =
                        !tempArray[index].customWeekDays.sunday;
                      setDosages(tempArray);
                    }}
                  >
                    Sun
                  </ToggleButton>
                  <ToggleButton
                    value={"Monday"}
                    selected={dose.customWeekDays.monday}
                    onClick={() => {
                      let tempArray = [...dosages];
                      tempArray[index].customWeekDays.monday =
                        !tempArray[index].customWeekDays.monday;
                      setDosages(tempArray);
                    }}
                  >
                    Mon
                  </ToggleButton>
                  <ToggleButton
                    value={"Tuesday"}
                    selected={dose.customWeekDays.tuesday}
                    onClick={() => {
                      let tempArray = [...dosages];
                      tempArray[index].customWeekDays.tuesday =
                        !tempArray[index].customWeekDays.tuesday;
                      setDosages(tempArray);
                    }}
                  >
                    Tue
                  </ToggleButton>
                  <ToggleButton
                    value={"Wednesday"}
                    selected={dose.customWeekDays.wednesday}
                    onClick={() => {
                      let tempArray = [...dosages];
                      tempArray[index].customWeekDays.wednesday =
                        !tempArray[index].customWeekDays.wednesday;
                      setDosages(tempArray);
                    }}
                  >
                    Wed
                  </ToggleButton>
                </ToggleButtonGroup>
                <ToggleButtonGroup fullWidth disabled={!dose.isWeekly}>
                  <ToggleButton
                    value={"Thursday"}
                    selected={dose.customWeekDays.thursday}
                    onClick={() => {
                      let tempArray = [...dosages];
                      tempArray[index].customWeekDays.thursday =
                        !tempArray[index].customWeekDays.thursday;
                      setDosages(tempArray);
                    }}
                  >
                    Thur
                  </ToggleButton>
                  <ToggleButton
                    value={"Friday"}
                    selected={dose.customWeekDays.friday}
                    onClick={() => {
                      let tempArray = [...dosages];
                      tempArray[index].customWeekDays.friday =
                        !tempArray[index].customWeekDays.friday;
                      setDosages(tempArray);
                    }}
                  >
                    Fri
                  </ToggleButton>
                  <ToggleButton
                    value={"Saturday"}
                    selected={dose.customWeekDays.saturday}
                    onClick={() => {
                      let tempArray = [...dosages];
                      tempArray[index].customWeekDays.saturday =
                        !tempArray[index].customWeekDays.saturday;
                      setDosages(tempArray);
                    }}
                  >
                    Sat
                  </ToggleButton>
                </ToggleButtonGroup>
              </Paper>
            </Collapse>
            <Collapse in={dose.isOnceAMonth}>
              <DatePickerForDialog
                getEndDate={() => { }}
                isGetEndDate={false}
                disable={!dose.isOnceAMonth}
                label={"Begin taking on"}
                getMonthlyDate={getMonthlyDate}
                index={index}
                isMonthly={true}
                getRefillDate={() => { }}
                isRefill={false}
              />
            </Collapse>
            <br />
            <Button
              fullWidth
              variant={"contained"}
              onClick={() => deleteDosage(index)}
            >
              Delete dosage
            </Button>
            <br />
            <br />
            <Divider />
            <br />
          </>
        );
      })}
      <br />
      <Button
        onClick={() =>
          setDosages((prevState) => [
            ...prevState,
            {
              amount: 0,
              time: new Date(),
              isDaily: false,
              isWeekly: false,
              isOnceAMonth: false,
              customOnceAMonthDate: new Date(),
              customWeekDays: {
                monday: false,
                tuesday: false,
                wednesday: false,
                thursday: false,
                friday: false,
                saturday: false,
                sunday: false,
              },
            },
          ])
        }
        size={"small"}
        fullWidth
        variant="contained"
      >
        Add a Dosage
      </Button>
    </>
  );
};

export default MedicationDialogDosages;
