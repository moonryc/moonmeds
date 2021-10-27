import React, {useEffect, useState} from 'react';
import {Button, ButtonGroup, Divider, Switch, TextField} from "@mui/material";
import Typography from "@mui/material/Typography";
import {IMedicationBase} from "../../../../../Types/MedicationTypes";
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import MedicationCardOwner from "./MedicationCardOwner";



/**
 *
 * @property medication - IMedicationBase,
 * @property updateMedicationDetails( name:string,nextFillDate:Date,userNotes:string,prescriptionDosage:number) - void
 */
interface IMedicationCardEditDetails {
    medication: IMedicationBase,

    updateMedicationDetails(prescriptionName: string, nextFilledDate: Date,userNotes: string, prescriptionDosage: number,medicationOwner:string,endDate:Date,inDefinite:boolean): void
}

//*TODO(Spotexx): theming*/}
/**
 * For editing the medication card prescription name, prescription dosage, next refill date, and notes
 * @param props - {medication:IMedicationBase, updateMedicationDetails( name:string,nextFillDate:Date,userNotes:string,prescriptionDosage:number)}
 * @constructor
 */
const MedicationCardEditDetails = (props: IMedicationCardEditDetails) => {


    //region useState

    /**
     * value of the prescription name
     */
    const [prescriptionName, setPrescriptionName] = useState<string>(props.medication.prescriptionName);
    /**
     * Value of the prescription dosage
     */
    const [prescriptionDosage, setPrescriptionDosage] = useState<number>(props.medication.prescriptionDosage);
    /**
     * Value of the next fill date
     */
    const [nextFillDate, setNextFillDate] = useState<Date>(props.medication.nextFillDay);
    /**
     * Value of the user notes regarding the selected medication
     */
    const [userNotes, setUserNotes] = useState<string>(props.medication.userNotes);
    const [medicationEndDate, setMedicationEndDate] = useState(props.medication.endDate);
    const [isIndefinite, setIsIndefinite] = useState(props.medication.inDefinite);

    //endregion


    //region functions

    /**
     * updates the prescriptionName property when changed
     * @param e
     */
    const handlePrescriptionNameOnChange = (e: any) => {
        setPrescriptionName(e.target.value)
    }

    /**
     * updates the prescriptionDosage property when changed
     * @param e
     */
    const handlePrescriptionDosageOnChange = (e: any) => {
        setPrescriptionDosage(e.target.value)
    }

    /**
     * updates the userNotes property when changed
     * @param e
     */
    const handleUserNotesChange = (e: any) => {
        setUserNotes(e.target.value)
    }

    /**
     * updates the next fill date property when using the mobileDatePicker component
     * @param newValue
     */
    const handleMobileDatePickerChange = (newValue: Date | null) => {
        if (newValue == null) {
            setNextFillDate(new Date())
        } else {
            setNextFillDate(newValue);
        }
    };

    /**
     * updates the next fill date property when using the mobileDatePicker component
     * @param newValue
     */
    const handleEndDateDatePickerChange = (newValue: Date | null) => {
        if (newValue == null) {
            setMedicationEndDate(new Date())
        } else {
            setMedicationEndDate(newValue);
        }
    };


    //endregion

    //region useEffect

    /**
     * updates the parent component MedicationCard whenever the prescription name, fill Date, user notes,
     * or prescription dosage changes
     */
    useEffect(() => {
        props.updateMedicationDetails(prescriptionName, nextFillDate, userNotes, prescriptionDosage,props.medication.medicationOwner,medicationEndDate,isIndefinite)

    }, [prescriptionName, nextFillDate, userNotes, prescriptionDosage]); // eslint-disable-line react-hooks/exhaustive-deps

    //endregion

    return (
        <div>
            <Typography paragraph>
                <br/>
                <TextField size={"small"}
                           onChange={(e) => handlePrescriptionNameOnChange(e)}
                           id="outlined-number"
                           label={"Prescription Name"} type="text" InputLabelProps={{shrink: true,}}
                           defaultValue={props.medication.prescriptionName}/>
            </Typography>
            <Divider/>
            <Typography paragraph>
                <br/>
                <MedicationCardOwner  medication={props.medication} updateMedicationDetails={props.updateMedicationDetails}/>
            </Typography>
            <Typography paragraph>
                <br/>
                <TextField size={"small"}
                           onChange={(e) => handlePrescriptionDosageOnChange(e)}
                           id="outlined-number"
                           label={"Prescription Dosage"} type="number" InputLabelProps={{shrink: true,}}
                           defaultValue={props.medication.prescriptionDosage}/>
                <br/>
            </Typography>
            <Divider/>
            <Typography paragraph>
                <br/>
                <MobileDatePicker
                    label="Next Refill"
                    inputFormat="MM/dd/yyyy"
                    value={nextFillDate}
                    onChange={handleMobileDatePickerChange}
                    renderInput={(params) => <TextField {...params} />}
                />
                <br/>
            </Typography>
            <Divider/>
            <Typography paragraph>












                <br/>
                Stop taking medication

                <ButtonGroup variant={"contained"}>
                    <Button disabled={isIndefinite} onClick={()=>setIsIndefinite(!isIndefinite)}>Never</Button>
                    <Button disabled={!isIndefinite} onClick={()=>setIsIndefinite(!isIndefinite)}>Specific Day</Button>
                </ButtonGroup>

                <br/>
                <br/>

                {isIndefinite ? <></> : <>
                    <MobileDatePicker
                        label="Next Refill"
                        inputFormat="MM/dd/yyyy"
                        value={medicationEndDate}
                        onChange={handleEndDateDatePickerChange}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </>
                }









                <br/>
            </Typography>
            <Divider/>
            <Typography>
                <br/>
                <TextField
                    id="outlined-multiline-static"
                    label="Notes"
                    multiline
                    rows={4}
                    onChange={(e) => handleUserNotesChange(e)}
                    InputLabelProps={{shrink: true,}}
                    defaultValue={props.medication.userNotes}
                />
                <br/>
                <br/>
            </Typography>
        </div>
    );
};

export default MedicationCardEditDetails;
