import React, { useContext, useEffect, useMemo, useState } from "react";
import { ICalendarDay } from "../../../../../Types/CalendarType";
import {
    Badge,
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    Fab,
    List,
    ListItem,
    ListSubheader,
    Typography,
    useMediaQuery,
} from "@mui/material";
import {
    differenceInDays,
    format,
    isAfter,
    isBefore,
    isFriday,
    isMonday,
    isSameDay,
    isSaturday,
    isSunday,
    isThursday,
    isTuesday,
    isWednesday,
    parseISO,
    toDate
} from "date-fns";
import { CalendarContext } from "../../../Context/CalendarContext";
import { sideBackgroundStyle, titleStyle } from "../../../Styles";
import { Face } from "@mui/icons-material";
import { ApiContext } from "../../../Context/ApiContext";
import { MedicationContext } from "../../../Context/MedicationContext";
import { IMedicationBase } from "../../../../../Types/MedicationTypes";
import { IMedicationDosagesBase } from "../../../../../Types/MedicationDosagesTypes";
import DatePickerForDialog from "../../MedicationDialog/DatePickerForDialog";
import { FilterMenu } from "../../Misc/FilterMenu";


interface IDisplayDateDetailsProp {
    selectedDate: ICalendarDay;
}




/**
 * This component displays medications that need to be taken, have been taken,
 * missed medications, and upcoming refills for a specified day
 * @param props
 * @constructor
 */
const DisplayDateDetails: React.FC<IDisplayDateDetailsProp> = ({ selectedDate }) => {

    const date = useMemo(
        () => toDate(selectedDate.date).toDateString(),
        [selectedDate.date]
    );


    const { userMedications, userMedicationDosages } = useContext(MedicationContext)
    const { putUpdateMedicationDosage } = useContext(ApiContext);
    const { selectedDay } = useContext(CalendarContext);



    const [isRefillDialogOpen, setIsRefillDialogOpen] = useState<boolean>(false);


    const [filteredFutureDosages, setFilteredFutureDosages] = useState<IMedicationDosagesBase[]>([]);
    const [filteredSelectedDayDosages, setFilteredSelectedDayDosages] = useState<IMedicationDosagesBase[]>([]);

    /**
     * removes duplicate refills
     * @param dosageArray
     */
    const filteredRefills = (dosageArray: IMedicationDosagesBase[]) => {

        let tempArray: string[] = []
        let medicationsToRefill: IMedicationDosagesBase[] = []

        for (let dosage of dosageArray) {

            if (!tempArray.includes(dosage.medicationId) && differenceInDays(new Date(dosage.nextFillDay), new Date(date)) <= 7) {
                tempArray.push(dosage.medicationId)
                medicationsToRefill.push(dosage)
            }
        }

        return medicationsToRefill

    }

    //region today and past days

    const updateFilteredSelectedDayDosages = () => {
        let tempArray = userMedicationDosages.filter(dosage => {
            if (isSameDay(new Date(dosage.timeToTake), new Date(selectedDay))) {
                return true
            }
        })
        setFilteredSelectedDayDosages([...tempArray])
    }


    //endregion

    //region view future days

    //TODO TRAVIS DO WE NEED THIS?
    const taken = 'taken.dark !important';
    const updateFilteredFutureDosages = () => {
        //filters out medications that arnt going to be taken on that date due to not being indefinite or stops taking medicaiton before that date
        let arrayOfValidFutureMedication: IMedicationBase[] = userMedications.filter((medication) => {
            return isBefore(medication.endDate, new Date(date)) || medication.inDefinite;
        })

        let arrayOfValidDosages: IMedicationDosagesBase[] = []

        for (let medication of arrayOfValidFutureMedication) {
            for (let dosage of medication.dosages) {
                let { time, customWeekDays } = dosage
                let tempDosage: IMedicationDosagesBase = {
                    ...customWeekDays,
                    userId: medication.userId,
                    medicationId: medication.medicationId,
                    dosageId: "",
                    prescriptionName: medication.prescriptionName,
                    nextFillDay: medication.nextFillDay,
                    endDate: medication.endDate,
                    inDefinite: medication.inDefinite,
                    amount: dosage.amount,
                    medicationOwner: medication.medicationOwner,
                    timeToTake: time,
                    isDaily: dosage.isDaily,
                    isWeekly: dosage.isWeekly,
                    isOnceAMonth: dosage.isOnceAMonth,
                    customOnceAMonthDate: dosage.customOnceAMonthDate,
                    hasBeenTaken: false,
                    hasBeenMissed: false,
                    timeTaken: false
                }


                if (dosage.isDaily) {
                    arrayOfValidDosages.push(tempDosage)
                } else if (dosage.isWeekly) {
                    let selectedDate = new Date(date)
                    if (dosage.customWeekDays.monday && isMonday(selectedDate)) {
                        arrayOfValidDosages.push(tempDosage)
                    }
                    if (dosage.customWeekDays.tuesday && isTuesday(selectedDate)) {
                        arrayOfValidDosages.push(tempDosage)
                    }
                    if (dosage.customWeekDays.wednesday && isWednesday(selectedDate)) {
                        arrayOfValidDosages.push(tempDosage)
                    }
                    if (dosage.customWeekDays.thursday && isThursday(selectedDate)) {
                        arrayOfValidDosages.push(tempDosage)
                    }
                    if (dosage.customWeekDays.friday && isFriday(selectedDate)) {
                        arrayOfValidDosages.push(tempDosage)
                    }
                    if (dosage.customWeekDays.saturday && isSaturday(selectedDate)) {
                        arrayOfValidDosages.push(tempDosage)
                    }
                    if (dosage.customWeekDays.sunday && isSunday(selectedDate)) {
                        arrayOfValidDosages.push(tempDosage)
                    }

                } else if (dosage.isOnceAMonth) {
                    //TODO more research about the number of days
                    if (differenceInDays(new Date(dosage.customOnceAMonthDate), new Date(date)) % 30 === 0) {
                        arrayOfValidDosages.push(tempDosage)
                    }
                }
            }
        }
        setFilteredFutureDosages([...arrayOfValidDosages])
    }

    useEffect(() => {


        updateFilteredFutureDosages()
        updateFilteredSelectedDayDosages()


    }, [userMedications, userMedicationDosages, selectedDay, date])

    //endregion

    //region String truncation
    const lg = useMediaQuery('(min-width:1200px)');
    const isXs = useMediaQuery('(max-width: 599px)');
    const isSm = useMediaQuery('(min-width: 600px) and (max-width: 899px)');
    const isMd = useMediaQuery('(min-width: 900px) and (max-width: 1199px)');
    const isLg = useMediaQuery('(min-width: 1200px) and (max-width: 1535px)');
    const isXl = useMediaQuery('(min-width: 1536px)');

    //truncates string based off useMediaQuery
    const truncateString = (string: string) => {

        if (isXs) {
            if (string.length > 20) {
                return string.substring(0, 20) + "..."
            } else {
                return string
            }
        }
        if (isSm) {
            if (string.length > 30) {
                return string.substring(0, 30) + "..."
            } else {
                return string
            }
        }
        if (isMd) {
            if (string.length > 40) {
                return string.substring(0, 40) + "..."
            } else {
                return string
            }
        }
        if (isLg) {
            if (string.length > 50) {
                return string.substring(0, 50) + "..."
            } else {
                return string
            }
        }
        if (isXl) {
            if (string.length > 60) {
                return string.substring(0, 60) + "..."
            } else {
                return string
            }
        }
    }

    //endregion


    const DateDetailsList = (dosagesList: IMedicationDosagesBase[], isFuture: boolean) => {

        return (
            <>
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: '6px' }}>

                </Box>
                <Divider />

                <List
                    sx={{
                        width: '100%',
                        height: '100%',
                        bgcolor: 'background.paper',
                        position: 'relative',
                        overflow: 'auto',
                        '& ul': { padding: 0 },
                    }}
                    subheader={<li />}
                >
                    {isFuture ?
                        <>
                            
                            <ListSubheader sx={{ fontSize: '20px', color: 'text.primary', textAlign: 'center' }}>Medications
                                Taken</ListSubheader>

                            {dosagesList.map((medicationDosage: IMedicationDosagesBase, index) => {
                                return medicationDosage.hasBeenTaken ? (
                                    <>
                                        <Divider />
                                        <ListItem key={index}>
                                            <Box
                                                sx={{
                                                    bgcolor: "background.paper",
                                                    width: "100%",
                                                    height: '100%',
                                                    borderRadius: 2,
                                                    position: "relative",
                                                    display: 'flex',
                                                    flexDirection: ['column', , , 'row'],

                                                    alignItems: 'center',
                                                }}
                                            ><Fab sx={{
                                                bgcolor: medicationDosage.medicationOwner.color,
                                                height: '35px',
                                                width: '35px',
                                                ':hover': { bgcolor: medicationDosage.medicationOwner.color },
                                                ':active': { transition: 'unidentified' }
                                            }}>
                                                    <Face sx={{
                                                        color: 'white',
                                                        position: 'relative',
                                                        height: '1em',
                                                        width: '1em'
                                                    }} /></Fab>
                                                <Typography
                                                    sx={{
                                                        marginLeft: "1vh",
                                                        fontSize: "15px",
                                                        top: "22.5%",
                                                        position: "relative",
                                                        width: '70%',
                                                        flex: '1',
                                                        p: '12px',
                                                        lineHeight: '35px',
                                                        textAlign: ['center', , , 'left']

                                                    }}
                                                >

                                                    {"  "}
                                                    <Typography
                                                        component={'span'}
                                                        sx={{ color: 'text.primary' }}
                                                        //@ts-ignore
                                                        //label={medicationDosage.prescriptionName.slice(0,document.getElementById("box").parentElement.clientWidth/50)}{truncateString(medicationDosage.prescriptionName)}
                                                        title={medicationDosage.prescriptionName}
                                                    >{truncateString(medicationDosage.prescriptionName)}</Typography>
                                                    <Typography component={'span'} sx={{ color: 'text.primary' }}>
                                                        {"Dosage was taken at "}

                                                        {format(parseISO(medicationDosage.timeTaken), "h:mmaa")}</Typography>
                                                </Typography>
                                                <Button
                                                    variant={"contained"}
                                                    sx={{
                                                        m: '1vw', bgcolor: 'taken.main',
                                                        width: ['100%', , , '140px'],
                                                        '&:hover': { bgcolor: 'taken.dark' }
                                                    }}
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
                                        </ListItem>
                                    </>
                                ) :
                                    (
                                        <span />
                                    );
                            })}
                            <Divider /></>
                        : <></>
                    }

                   
                    <ListSubheader sx={{ fontSize: '20px', color: 'text.primary', textAlign: 'center' }}
                    >Medications
                        To Take</ListSubheader>
                    {dosagesList.map((medicationDosage: IMedicationDosagesBase, index) => {
                        return !medicationDosage.hasBeenTaken &&
                            !medicationDosage.hasBeenMissed ? (
                            <>
                                <Divider />
                                <ListItem key={index}>
                                    <Box
                                        sx={{
                                            bgcolor: "background.paper",
                                            width: "100%",
                                            height: '100%',
                                            borderRadius: 2,
                                            position: "relative",
                                            display: 'flex',
                                            flexDirection: ['column', , , 'row'],

                                            alignItems: 'center'
                                        }}
                                    > <Fab sx={{
                                        bgcolor: medicationDosage.medicationOwner.color,
                                        height: '35px',
                                        width: '35px',
                                        ':hover': { bgcolor: medicationDosage.medicationOwner.color },
                                        ':active': { transition: 'unidentified' }
                                    }}>
                                            <Face sx={{
                                                color: 'white',
                                                position: 'relative',
                                                height: '1em',
                                                width: '1em'
                                            }} /></Fab>
                                        <Typography
                                            sx={{
                                                marginLeft: "1vh",
                                                fontSize: "15px",
                                                top: "22.5%",
                                                position: "relative",
                                                width: '70%',
                                                flex: '1',
                                                p: '12px',
                                                lineHeight: '35px',
                                                textAlign: ['center', , , 'left']
                                            }}
                                        >

                                            {"  "}
                                            <Typography
                                                component={'span'}
                                                title={medicationDosage.prescriptionName}
                                            >
                                                {truncateString(medicationDosage.prescriptionName)}</Typography>
                                            {" Dosage to be taken at "}
                                            {format(
                                                parseISO(medicationDosage.timeToTake.toString()),
                                                "h:mm aa"
                                            ).toString()}
                                        </Typography>
                                        {isFuture ?
                                            <Button
                                                variant={"contained"}
                                                sx={{
                                                    m: '1vw', bgcolor: 'toTake.main',
                                                    width: ['100%', , , '140px'],
                                                    '&:hover': { bgcolor: 'toTake.dark' }
                                                }}
                                                onClick={() =>
                                                    putUpdateMedicationDosage(
                                                        medicationDosage.dosageId,
                                                        true,
                                                        medicationDosage.hasBeenMissed,
                                                        new Date()
                                                    )
                                                }
                                            >
                                                Taken
                                            </Button> : <></>}
                                    </Box>
                                    <br />
                                </ListItem>
                            </>
                        ) : (
                            <span />
                        );
                    })}
                    <Divider />

                    {isFuture ? <>
                       
                        <ListSubheader sx={{ fontSize: '20px', color: 'text.primary', textAlign: 'center' }}
                        >Missed Medications</ListSubheader>
                        {dosagesList.map((medicationDosage: IMedicationDosagesBase, index) => {
                            return medicationDosage.hasBeenMissed &&
                                !medicationDosage.hasBeenTaken ? (
                                <>
                                    <Divider />
                                    <ListItem key={index}>
                                        <Box

                                            sx={{
                                                bgcolor: "background.paper",
                                                width: "100%",
                                                height: '100%',
                                                borderRadius: 2,
                                                position: "relative",
                                                display: 'flex',
                                                flexDirection: ['column', , , 'row'],

                                                alignItems: 'center'
                                            }}
                                        > <Fab sx={{
                                            bgcolor: medicationDosage.medicationOwner.color,
                                            height: '35px',
                                            width: '35px',
                                            ':hover': { bgcolor: medicationDosage.medicationOwner.color },
                                            ':active': { transition: 'unidentified' }
                                        }}>
                                                <Face sx={{
                                                    color: 'white',
                                                    position: 'relative',
                                                    height: '1em',
                                                    width: '1em'
                                                }} /></Fab>
                                            <Typography
                                                sx={{
                                                    marginLeft: "1vh",
                                                    fontSize: "15px",
                                                    top: "22.5%",
                                                    position: "relative",
                                                    width: '70%',
                                                    flex: '1',
                                                    p: '12px',
                                                    lineHeight: '35px',
                                                    textAlign: ['center', , , 'left']


                                                }}
                                            >

                                                {"  "}
                                                <Typography
                                                    component={'span'}
                                                    title={medicationDosage.prescriptionName}
                                                >{truncateString(medicationDosage.prescriptionName)}</Typography>
                                                {" Dosage was missed at "}
                                                {format(
                                                    parseISO(medicationDosage.timeToTake.toString()),
                                                    "h:mm aa"
                                                ).toString()}
                                            </Typography>
                                            <Button
                                                variant={"contained"}
                                                sx={{
                                                    m: '1vw', bgcolor: 'missed.main',
                                                    width: ['100%', , , '140px'],
                                                    '&:hover': { bgcolor: 'missed.dark' }
                                                }}
                                                onClick={() =>
                                                    putUpdateMedicationDosage(
                                                        medicationDosage.dosageId,
                                                        true,
                                                        medicationDosage.hasBeenMissed,
                                                        new Date()
                                                    )
                                                }
                                            >
                                                Taken
                                            </Button>
                                        </Box>
                                        <br />
                                    </ListItem>
                                </>
                            ) : (
                                <span />
                            );
                        })}
                        <Divider />
                    </> : <></>
                    }

                    
                    <ListSubheader sx={{ fontSize: '20px', color: 'text.primary', textAlign: 'center' }}
                    >Upcoming Refills</ListSubheader>
                    {filteredRefills(dosagesList).map((medicationDosage: IMedicationDosagesBase, index) => {
                        const numberOfDaysBeforeRefill = differenceInDays(
                            new Date(medicationDosage.nextFillDay),
                            new Date(medicationDosage.timeToTake)
                        );
                        return (
                            <>
                                <Divider />
                                <ListItem key={index}>
                                    {numberOfDaysBeforeRefill <= 7 ? (
                                        <>
                                            <Box
                                                sx={{
                                                    bgcolor: "background.paper",
                                                    width: "100%",
                                                    height: '100%',
                                                    borderRadius: 2,
                                                    position: "relative",
                                                    display: 'flex',
                                                    flexDirection: ['column', , , 'row'],

                                                    alignItems: 'center'
                                                }}
                                            > <Fab sx={{
                                                bgcolor: medicationDosage.medicationOwner.color,
                                                height: '35px',
                                                width: '35px',
                                                ':hover': { bgcolor: medicationDosage.medicationOwner.color },
                                                ':active': { transition: 'unidentified' }
                                            }}>
                                                    <Face sx={{
                                                        color: 'white',
                                                        position: 'relative',
                                                        height: '1em',
                                                        width: '1em'
                                                    }} /></Fab>
                                                <Typography
                                                    sx={{
                                                        marginLeft: "1vh",
                                                        fontSize: "15px",
                                                        top: "22.5%",
                                                        position: "relative",
                                                        width: '70%',
                                                        flex: '1',
                                                        p: '12px',
                                                        lineHeight: '35px',
                                                        textAlign: ['center', , , 'left']
                                                    }}
                                                >

                                                    {"  "}
                                                    <Typography
                                                        component={'span'}
                                                        title={medicationDosage.prescriptionName}
                                                    >{truncateString(medicationDosage.prescriptionName)}</Typography>
                                                    {" refill in " +
                                                        differenceInDays(
                                                            new Date(medicationDosage.nextFillDay),
                                                            new Date()
                                                        ) +
                                                        " days"}
                                                </Typography>
                                                <Button
                                                    variant={"contained"}
                                                    sx={{
                                                        m: '1vw', bgcolor: 'refills.main',
                                                        width: ['100%', , , '140px'],
                                                        '&:hover': { bgcolor: 'refills.dark' }
                                                    }}
                                                >
                                                    moon's reminder to fix
                                                </Button>
                                            </Box>
                                            <br />
                                        </>
                                    ) : (
                                        <span />
                                    )}
                                </ListItem>
                            </>
                        );
                    })}
                    {dosagesList.filter(detail => differenceInDays(new Date(detail.nextFillDay), new Date()) <= 7).length > 0 ?
                        <Divider /> : <span />}
                </List>
            </>
        )
    }

    return (
        <>
            <Box
                sx={{
                    paddingTop: [undefined,"30px"], height: '100%', position: "relative",
                    ...sideBackgroundStyle
                }}
            >
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'relative',
                    alignItems: 'center'
                }}>
                    
                    <Box sx={{display:'flex',flexDirection:'column' }}>
                        <Typography variant={"h4"}
                            sx={{ ...titleStyle, position: 'relative', left: 0, right: 0, margin: 'auto' }}>
                            {format(selectedDay, "MMMM").toString()}
                        </Typography>
                        <Box sx={{display:'flex', flexDirection:'row', width:'auto', justifyContent:'center', alignItems:'center'}}>
                            <Typography variant={"h4"}
                                sx={{ ...titleStyle, position: 'relative', left: 0, right: 0,}}>
                                {format(selectedDay, "yyyy").toString()}
                            </Typography>
                            
                        </Box>
                    </Box>
                </Box>
                {/*<br/>*/}
                {isAfter(new Date(date), new Date()) ? DateDetailsList(filteredFutureDosages, false) : DateDetailsList(filteredSelectedDayDosages, true)}

            </Box>

            <Dialog open={isRefillDialogOpen}>
                <DialogTitle>
                    <Typography variant={"h6"}>
                        Refill Medication
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    <DatePickerForDialog
                        getEndDate={() => {
                        }}
                        getRefillDate={() => {
                            //TODO
                        }}

                        getMonthlyDate={() => {
                        }}
                        isGetEndDate={false}
                        disable={false}
                        label={"Next Refill Date"}
                        isMonthly={false}
                        index={0}
                        isRefill={true}
                        datePassed={new Date()} />
                </DialogContent>
                <DialogActions>
                    {/*    TODO*/}
                </DialogActions>
            </Dialog>
        </>
    );
};

export default DisplayDateDetails;
