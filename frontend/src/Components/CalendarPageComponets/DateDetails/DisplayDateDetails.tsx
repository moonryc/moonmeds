import React, {useContext, useEffect, useMemo, useRef, useState} from "react";
import {ICalendarDay} from "../../../../../Types/CalendarType";
import {Badge, Box, Button, Divider, Fab, IconButton, List, ListItem, ListSubheader, Typography,} from "@mui/material";
import {
    differenceInDays,
    format,
    isAfter,
    isBefore, isFriday,
    isMonday, isSaturday, isSunday, isThursday,
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
import {makeDosageDetails} from "../../../typeConstructors";
import {IMedicationDosagesBase} from "../../../../../Types/MedicationDosagesTypes";
import {IPersonNameAndColor} from "../../../../../Types/UserTypes";
import medication from "../../../../../routes/medication";

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

    //region view future days

    const filteredRefills = (dosageArray:IMedicationDosagesBase[]) => {

        let tempArray:string[] = []
        let medicationsToRefill:IMedicationDosagesBase[] = []

        for(let dosage of dosageArray){

            if(!tempArray.includes(dosage.medicationId) && differenceInDays(new Date(dosage.nextFillDay),new Date(date))<=7){
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

    const FutureDosages = () => {
        return (

            <Box ref={ref}
                 sx={{padding: "3vh", height: '100%', position: "relative"}}
            >

                <Typography variant={"h4"} sx={{...titleStyle, ...centeredTextStyle}}>
                    Date Details
                </Typography>
                <Box sx={{display: 'flex', justifyContent: "space-between"}}>
                    <Typography variant={"h5"} sx={{display: "inline"}}>{date.toString()}</Typography>

                    <Box sx={{display: "inline", flexWrap: "wrap"}}>
                        <Box sx={{display: "inline"}}>


                                <Fab sx={{
                                    ':hover': {
                                        bgcolor: 'green', // theme.palette.primary.main
                                        opacity: "50%"
                                    },
                                    bgcolor:"green",
                                }}
                                     size={"large"}
                                onClick={()=> {
                                    //@ts-ignore
                                    scrollToTake()
                                }}
                                >
                                <Badge
                                    badgeContent={filteredFutureDosages.filter(detail => !detail.hasBeenTaken && !detail.hasBeenMissed).length}
                                    color={"secondary"}>
                                    <WatchLater sx={{color:"white"}} fontSize={"large"}/>
                                </Badge>
                                </Fab>
                            {/*</IconButton>*/}

                            <IconButton onClick={() => {
                                // @ts-ignore
                                scrollToRefill()
                            }}>
                                <Badge
                                    badgeContent={filteredRefills(filteredFutureDosages).filter(detail => differenceInDays(new Date(detail.nextFillDay), new Date()) <= 7).length}>
                                    <Update fontSize={"large"}/>
                                </Badge>
                            </IconButton>
                        </Box>
                    </Box>
                </Box>

                <Divider/>
                <List
                    sx={{
                        width: '100%',
                        height: '65vh',
                        bgcolor: 'background.paper',
                        position: 'relative',
                        overflow: 'auto',

                        '& ul': {padding: 0},
                    }}
                    subheader={<li/>}
                    id={"list"}
                >
                    <ListSubheader sx={{fontSize: '20px', color: 'text.primary', textAlign: 'center'}} id={'To-Take'}>Medications
                        To Take</ListSubheader>
                    {filteredFutureDosages.map((medicationDosage, index) => {
                        return (
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
                                            <Face sx={{color: medicationDosage.medicationOwner.color,position:'relative', top:'.2em', height:'.9em', width:'1em'}}/>
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

                                    </Box>
                                    <br/>
                                </ListItem>
                            </>
                        )
                    })}
                    <Divider/>


                    <ListSubheader sx={{fontSize: '20px', color: 'text.primary', textAlign: 'center'}}
                                   id={'Upcoming-Refills'}>Upcoming Refills</ListSubheader>
                    {filteredRefills(filteredFutureDosages).map((medicationDosage, index) => {
                        const numberOfDaysBeforeRefill = differenceInDays(
                            new Date(medicationDosage.nextFillDay),
                            new Date(date)
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
                                                    <Face sx={{color: medicationDosage.medicationOwner.color,position:'relative', top:'.2em', height:'.9em', width:'1em'}}/>
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
                                                    sx={{m: '1vw', bgcolor: 'blue'}}
                                                >
                                                    Refill
                                                </Button>
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
                </List>
                {filteredRefills(filteredFutureDosages).filter(detail => differenceInDays(new Date(detail.nextFillDay), new Date()) <= 7).length > 0 ?
                    <Divider/> :<span/>}

            </Box>

        )
    }


    const PastAndTodayDosages = () => {
        return (
            <Box ref={ref}
                 sx={{padding: "3vh", height: '100%', position: "relative"}}
            >

                <Typography variant={"h4"} sx={{...titleStyle, ...centeredTextStyle}}>
                    Date Details
                </Typography>
                <Box sx={{display: 'flex', justifyContent: "space-between"}}>
                    <Typography variant={"h5"} sx={{display: "inline"}}>{date.toString()}</Typography>

                    <Box sx={{display: "inline", flexWrap: "wrap"}}>
                        <Box sx={{display: "inline"}}>
                            <IconButton onClick={() => {
                                // @ts-ignore
                                scrollToTaken()
                            }}>
                                <Badge badgeContent={selectedDayDetails.filter(detail => detail.hasBeenTaken).length}>
                                    <Check fontSize={"large"}/>
                                </Badge>
                            </IconButton>
                            <IconButton onClick={() => {
                                // @ts-ignore
                                scrollToTake()
                            }}>
                                <Badge
                                    badgeContent={selectedDayDetails.filter(detail => !detail.hasBeenTaken && !detail.hasBeenMissed).length}>
                                    <WatchLater fontSize={"large"}/>
                                </Badge>
                            </IconButton>
                        </Box>
                        <Box sx={{display: "inline"}}>
                            <IconButton onClick={() => {
                                // @ts-ignore
                                scrollToMissed()
                            }}>
                                <Badge
                                    badgeContent={selectedDayDetails.filter(detail => !detail.hasBeenTaken && detail.hasBeenMissed).length}>
                                    <AssignmentLate fontSize={"large"}/>
                                </Badge>
                            </IconButton>
                            <IconButton onClick={() => {
                                // @ts-ignore
                                scrollToRefill()
                            }}>
                                <Badge
                                    badgeContent={filteredRefills(selectedDayDetails).filter(detail => differenceInDays(new Date(detail.nextFillDay), new Date()) <= 7).length}>
                                    <Update fontSize={"large"}/>
                                </Badge>
                            </IconButton>
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
                    id={"list"}
                >
                <Box ref={takenRef}>
                    <ListSubheader sx={{fontSize: '20px', color: 'text.primary', textAlign: 'center'}} id={'Taken'}>Medications
                        Taken</ListSubheader>
                </Box>
                    {selectedDayDetails.map((medicationDosage, index) => {
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
                                                <Face sx={{color: medicationDosage.medicationOwner.color,position:'relative', top:'.2em', height:'.9em', width:'1em'}}/>
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
                    <Divider/>
                    <Box ref={toTakeRef}>
                        <ListSubheader sx={{fontSize: '20px', color: 'text.primary', textAlign: 'center'}}
                                       id={'To-Take'}>Medications
                            To Take</ListSubheader></Box>
                    {selectedDayDetails.map((medicationDosage, index) => {
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
                                            <Face sx={{color: medicationDosage.medicationOwner.color,position:'relative', top:'.2em', height:'.9em', width:'1em'}}/>
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

                    <Box ref={missedRef}>
                    <ListSubheader sx={{fontSize: '20px', color: 'text.primary', textAlign: 'center'}}
                                   id={'Missed-Medications'}>Missed Medications</ListSubheader></Box>
                    {selectedDayDetails.map((medicationDosage, index) => {
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
                                            <Face sx={{color: medicationDosage.medicationOwner.color,position:'relative', top:'.2em', height:'.9em', width:'1em'}}/>
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
                    <Box ref={refillRef}>
                    <ListSubheader sx={{fontSize: '20px', color: 'text.primary', textAlign: 'center'}}
                                   id={'Upcoming-Refills'}>Upcoming Refills</ListSubheader></Box>
                    {filteredRefills(selectedDayDetails).map((medicationDosage, index) => {
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
                                                    <Face sx={{color: medicationDosage.medicationOwner.color,position:'relative', top:'.2em', height:'.9em', width:'1em'}}/>
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
                                                    sx={{m: '1vw', bgcolor: 'blue'}}
                                                >
                                                    Refill
                                                </Button>
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
                        <span/> : <Divider/>}
                </List>
            </Box>
        )
    }

    return (
        <>
            {isAfter(new Date(date), new Date()) ? FutureDosages() : PastAndTodayDosages()}
        </>
    );
};

export default DisplayDateDetails;
