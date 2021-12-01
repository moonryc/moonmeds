import React, {useCallback, useContext, useEffect, useMemo, useRef, useState} from "react";
import {ICalendarDay} from "../../../../../Types/CalendarType";
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
    IconButton,
    List,
    ListItem,
    ListSubheader,
    Typography,
} from "@mui/material";
import {
    differenceInDays,
    format,
    isAfter,
    isBefore,
    isFriday,
    isMonday,
    isSaturday,
    isSunday,
    isThursday,
    isTuesday,
    isWednesday,
    parseISO,
    toDate
} from "date-fns";
import {CalendarContext} from "../../../Context/CalendarContext";
import {centeredTextStyle, titleStyle} from "../../../Styles";
import {AssignmentLate, Check, Face, Update, WatchLater} from "@mui/icons-material";
import {ApiContext} from "../../../Context/ApiContext";
import {MedicationContext} from "../../../Context/MedicationContext";
import {IMedicationBase} from "../../../../../Types/MedicationTypes";
import {IMedicationDosagesBase} from "../../../../../Types/MedicationDosagesTypes";
import DatePickerForDialog from "../../MedicationDialog/DatePickerForDialog";


interface IDisplayDateDetailsProp {
    selectedDate: ICalendarDay;
}


const useScroll = () => {
    const elRef = useRef(null);
    // @ts-ignore
    const executeScroll = () => elRef.current.scrollIntoView();

    return [executeScroll, elRef];
};

/**
 * This component displays medications that need to be taken, have been taken,
 * missed medications, and upcoming refills for a specified day
 * @param props
 * @constructor
 */
const DisplayDateDetails: React.FC<IDisplayDateDetailsProp> = ({selectedDate}) => {

    const date = useMemo(
        () => toDate(selectedDate.date).toDateString(),
        [selectedDate.date]
    );

    const {selectedDayDetails} = useContext(CalendarContext);
    const {userMedications} = useContext(MedicationContext)
    const {putUpdateMedicationDosage} = useContext(ApiContext);

    const [scrollToTaken, takenRef] = useScroll()
    const [scrollToTake, toTakeRef] = useScroll()
    const [scrollToMissed, missedRef] = useScroll()
    const [scrollToRefill, refillRef] = useScroll()

    //region refill

    const [selectedRefillMedication, setSelectedRefillMedication] = useState<IMedicationBase>();
    const [isRefillDialogOpen, setIsRefillDialogOpen] = useState<boolean>(false);

    const getRefillDate = useCallback(
        (date: Date) => {
            // setSelectedRefillMedication(prevState => {
            //     prevState.nextFillDay = date
            //     return {...prevState}
            // })
        },
        [],
    );


    //endregion


    //region view future days

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
    const [filteredFutureDosages, setFilteredFutureDosages] = useState<IMedicationDosagesBase[]>([]);
    const updateFilteredFutureDosages = () => {
        //filters out medications that arnt going to be taken on that date due to not being indefinite or stops taking medicaiton before that date
        let arrayOfValidFutureMedication: IMedicationBase[] = userMedications.filter((medication) => {
            return isBefore(medication.endDate, new Date(date)) || medication.inDefinite;
        })

        let arrayOfValidDosages: IMedicationDosagesBase[] = []

        for (let medication of arrayOfValidFutureMedication) {
            for (let dosage of medication.dosages) {
                let {time, customWeekDays} = dosage
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
                    if (differenceInDays(dosage.customOnceAMonthDate, new Date(date)) % 30 === 0) {
                        arrayOfValidDosages.push(tempDosage)
                    }
                }
            }
        }

        console.log(arrayOfValidDosages)
        setFilteredFutureDosages([...arrayOfValidDosages])
    }

    useEffect(() => {

        updateFilteredFutureDosages()

    }, [userMedications])

    //endregion

    //region String truncation

    const [size, setSize] = useState<object>();
    const ref = useRef({})

    const updateDimensions = () => {
        //@ts-ignore
        if (ref.current) {setSize(ref.current.offsetWidth)};
    };

    useEffect(() => {
        window.addEventListener("resize", updateDimensions);
        return () => {
            window.removeEventListener("resize", updateDimensions);
        };
    }, [size]);

    const truncateString = (string: string) => {
        //@ts-ignore
        if (string.length > ref.current.offsetWidth / 25) {
            //@ts-ignore
            return string.slice(0, ref.current.offsetWidth / 25) + "...";
        } else {
            return string;
        }
    }

    //endregion


    const DateDetailsList = (dosagesList: IMedicationDosagesBase[], isFuture: boolean) => {

        return (
            <>
                <Box sx={{display: 'flex', justifyContent: "space-between"}}>
                <Typography variant={"h5"} sx={{display: "inline"}}>{date.toString()}</Typography>

                <Box sx={{display: "inline", flexWrap: "wrap"}}>
                    <Box sx={{display: "inline"}}>
                        <Fab
                            sx={{margin:"5px",textAlign:"center"}}
                            size={"small"}
                            onClick={() => {
                            // @ts-ignore
                            scrollToTaken()
                        }}>
                            <Badge
                                color={'secondary'}
                                badgeContent={dosagesList.filter(detail => detail.hasBeenTaken).length}>
                                <Check fontSize={"large"}/>
                            </Badge>
                        </Fab>
                        <Fab
                            sx={{margin:"5px"}}
                            size={"small"}
                            onClick={() => {
                            // @ts-ignore
                            scrollToTake()
                        }}>
                            <Badge
                                color={'secondary'}
                                badgeContent={dosagesList.filter(detail => !detail.hasBeenTaken && !detail.hasBeenMissed).length}>
                                <WatchLater fontSize={"large"}/>
                            </Badge>
                        </Fab>
                    </Box>
                    <Box sx={{display: "inline"}}>
                        <Fab
                            sx={{margin:"5px"}}
                            size={"small"}
                            onClick={() => {
                            // @ts-ignore
                            scrollToMissed()
                        }}>
                            <Badge
                                color={'secondary'}
                                badgeContent={dosagesList.filter(detail => !detail.hasBeenTaken && detail.hasBeenMissed).length}>
                                <AssignmentLate fontSize={"large"}/>
                            </Badge>
                        </Fab>
                        <Fab
                            sx={{margin:"5px"}}
                            size={"small"}
                            onClick={() => {
                            // @ts-ignore
                            scrollToRefill()
                        }}>
                            <Badge
                                color={'secondary'}
                                badgeContent={filteredRefills(dosagesList).filter(detail => differenceInDays(new Date(detail.nextFillDay), new Date()) <= 7).length}>
                                <Update fontSize={"large"}/>
                            </Badge>
                        </Fab>
                    </Box>
                </Box>
            </Box>
                <Divider/>

            <List
                sx={{
                    width: '100%',
                    height: '100%',
                    bgcolor: 'background.paper',
                    position: 'relative',
                    overflow: 'auto',
                    '& ul': {padding: 0},
                }}
                subheader={<li/>}
            >
                {isFuture ?
                    <>
                        <Box ref={takenRef}></Box>
                            <ListSubheader  sx={{fontSize: '20px', color: 'text.primary', textAlign: 'center'}}>Medications
                                Taken</ListSubheader>

                        {dosagesList.map((medicationDosage: IMedicationDosagesBase, index) => {
                            return medicationDosage.hasBeenTaken ? (
                                    <>
                                        <Divider/>
                                        <ListItem key={index}>
                                            <Box
                                                sx={{
                                                    bgcolor: "background.paper",
                                                    width: "100%",
                                                    height: '100%',
                                                    borderRadius: 2,
                                                    position: "relative",
                                                    display: 'flex',
                                                    alignContent: 'center'
                                                }}
                                            >
                                                <Typography
                                                    sx={{
                                                        marginLeft: "1vh",
                                                        fontSize: "15px",
                                                        top: "22.5%",
                                                        position: "relative",
                                                        width: '70%',
                                                        flex: '1',
                                                        p: '12px',
                                                        lineHeight: '35px'

                                                    }}
                                                >
                                                    <Fab sx={{
                                                        bgcolor: medicationDosage.medicationOwner.color,
                                                        height: '35px',
                                                        width: '35px',
                                                        ':hover': {bgcolor: medicationDosage.medicationOwner.color},
                                                        ':active': {transition: 'unidentified'}
                                                    }}>
                                                        <Face sx={{
                                                            color: 'white',
                                                            position: 'relative',
                                                            height: '1em',
                                                            width: '1em'
                                                        }}/></Fab>
                                                    {"  "}
                                                    <Typography
                                                        component={'span'}
                                                        sx={{color: 'text.primary'}}
                                                        //@ts-ignore
                                                        //label={medicationDosage.prescriptionName.slice(0,document.getElementById("box").parentElement.clientWidth/50)}{truncateString(medicationDosage.prescriptionName)}
                                                        title={medicationDosage.prescriptionName}
                                                    >{truncateString(medicationDosage.prescriptionName)}</Typography>
                                                    <Typography component={'span'} sx={{color: 'text.primary'}}>
                                                        Dosage was taken at

                                                        {format(parseISO(medicationDosage.timeTaken), "h:mm aa")}</Typography>
                                                </Typography>
                                                <Button
                                                    variant={"contained"}
                                                    sx={{m: '1vw', bgcolor: 'green'}}
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

                                            <br/>
                                        </ListItem>
                                    </>
                                ) :
                                (
                                    <span/>
                                );
                        })}
                        <Divider/></>
                    : <></>
                }

                <Box ref={toTakeRef}></Box>
                    <ListSubheader sx={{fontSize: '20px', color: 'text.primary', textAlign: 'center'}}
                                   >Medications
                        To Take</ListSubheader>
                {dosagesList.map((medicationDosage: IMedicationDosagesBase, index) => {
                    return !medicationDosage.hasBeenTaken &&
                    !medicationDosage.hasBeenMissed ? (
                        <>
                            <Divider/>
                            <ListItem key={index}>
                                <Box
                                    sx={{
                                        bgcolor: "background.paper",
                                        width: "100%",
                                        height: '100%',
                                        borderRadius: 2,
                                        position: "relative",
                                        display: 'flex',
                                        alignContent: 'center'
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            marginLeft: "1vh",
                                            fontSize: "15px",
                                            top: "22.5%",
                                            position: "relative",
                                            width: '70%',
                                            flex: '1',
                                            p: '12px',
                                            lineHeight: '35px'
                                        }}
                                    >
                                        <Fab sx={{
                                            bgcolor: medicationDosage.medicationOwner.color,
                                            height: '35px',
                                            width: '35px',
                                            ':hover': {bgcolor: medicationDosage.medicationOwner.color},
                                            ':active': {transition: 'unidentified'}
                                        }}>
                                            <Face sx={{
                                                color: 'white',
                                                position: 'relative',
                                                height: '1em',
                                                width: '1em'
                                            }}/></Fab>
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
                                    <Button
                                        variant={"contained"}
                                        sx={{m: '1vw', bgcolor: 'orange'}}
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
                                <br/>
                            </ListItem>
                        </>
                    ) : (
                        <span/>
                    );
                })}
                <Divider/>

                {isFuture ? <>
                    <Box ref={missedRef}></Box>
                        <ListSubheader sx={{fontSize: '20px', color: 'text.primary', textAlign: 'center'}}
                                       >Missed Medications</ListSubheader>
                    {dosagesList.map((medicationDosage: IMedicationDosagesBase, index) => {
                        return medicationDosage.hasBeenMissed &&
                        !medicationDosage.hasBeenTaken ? (
                            <>
                                <Divider/>
                                <ListItem key={index}>
                                    <Box

                                        sx={{
                                            bgcolor: "background.paper",
                                            width: "100%",
                                            height: '100%',
                                            borderRadius: 2,
                                            position: "relative",
                                            display: 'flex',
                                            alignContent: 'center'
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                marginLeft: "1vh",
                                                fontSize: "15px",
                                                top: "22.5%",
                                                position: "relative",
                                                width: '70%',
                                                flex: '1',
                                                p: '12px',
                                                lineHeight: '35px'


                                            }}
                                        >
                                            <Fab sx={{
                                                bgcolor: medicationDosage.medicationOwner.color,
                                                height: '35px',
                                                width: '35px',
                                                ':hover': {bgcolor: medicationDosage.medicationOwner.color},
                                                ':active': {transition: 'unidentified'}
                                            }}>
                                                <Face sx={{
                                                    color: 'white',
                                                    position: 'relative',
                                                    height: '1em',
                                                    width: '1em'
                                                }}/></Fab>
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
                                            sx={{m: '1vw', bgcolor: 'red'}}
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
                                    <br/>
                                </ListItem>
                            </>
                        ) : (
                            <span/>
                        );
                    })}
                    <Divider/>
                </> : <></>
                }

                <Box ref={refillRef}></Box>
                    <ListSubheader sx={{fontSize: '20px', color: 'text.primary', textAlign: 'center'}}
                                   >Upcoming Refills</ListSubheader>
                {filteredRefills(dosagesList).map((medicationDosage: IMedicationDosagesBase, index) => {
                    const numberOfDaysBeforeRefill = differenceInDays(
                        new Date(medicationDosage.nextFillDay),
                        new Date(medicationDosage.timeToTake)
                    );
                    return (
                        <>
                            <Divider/>
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
                                                alignContent: 'center'
                                            }}
                                        >
                                            <Typography
                                                sx={{
                                                    marginLeft: "1vh",
                                                    fontSize: "15px",
                                                    top: "22.5%",
                                                    position: "relative",
                                                    width: '70%',
                                                    flex: '1',
                                                    p: '12px',
                                                    lineHeight: '35px'
                                                }}
                                            >
                                                <Fab sx={{
                                                    bgcolor: medicationDosage.medicationOwner.color,
                                                    height: '35px',
                                                    width: '35px',
                                                    ':hover': {bgcolor: medicationDosage.medicationOwner.color},
                                                    ':active': {transition: 'unidentified'}
                                                }}>
                                                    <Face sx={{
                                                        color: 'white',
                                                        position: 'relative',
                                                        height: '1em',
                                                        width: '1em'
                                                    }}/></Fab>
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
                                            {/*<Button*/}
                                            {/*    variant={"contained"}*/}
                                            {/*    sx={{m: '1vw', bgcolor: 'blue'}}*/}
                                            {/*>*/}
                                            {/*    Refill*/}
                                            {/*</Button>*/}
                                        </Box>
                                        <br/>
                                    </>
                                ) : (
                                    <span/>
                                )}
                            </ListItem>
                        </>
                    );
                })}
                {selectedDayDetails.filter(detail => differenceInDays(new Date(detail.nextFillDay), new Date()) <= 7).length > 0 ?
                    <Divider/> :<span/> }
            </List>
            </>
        )
    }

    return (
        <>
            <Box ref={ref}
                 sx={{padding: "3vh", height: '100%', position: "relative"}}
            >
                <Typography variant={"h4"} sx={{...titleStyle, ...centeredTextStyle}}>
                    Date Details
                </Typography>
                {/*<br/>*/}
                {isAfter(new Date(date), new Date()) ? DateDetailsList(filteredFutureDosages, false) : DateDetailsList(selectedDayDetails, true)}

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
                        datePassed={new Date()}/>
                </DialogContent>
                <DialogActions>
                    {/*    TODO*/}
                </DialogActions>
            </Dialog>
        </>
    );
};

export default DisplayDateDetails;
