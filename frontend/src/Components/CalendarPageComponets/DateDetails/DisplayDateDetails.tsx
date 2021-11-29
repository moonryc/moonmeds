import React, {useContext, useEffect, useMemo, useRef, useState} from "react";
import {ICalendarDay} from "../../../../../Types/CalendarType";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary, Badge,
    Box,
    Button,
    Chip, Divider, IconButton, List, ListItem, ListItemButton, ListItemText, ListSubheader,
    Typography,
} from "@mui/material";
import {differenceInDays, format, parseISO, toDate} from "date-fns";
import {CalendarContext} from "../../../Context/CalendarContext";
import {centeredTextStyle, titleStyle} from "../../../Styles";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {AssignmentLate, Check, Face, Update, WatchLater} from "@mui/icons-material";
import MedicationIcon from "@mui/icons-material/Medication";
import {ApiContext} from "../../../Context/ApiContext";

interface IDisplayDateDetailsProp {
    selectedDate: ICalendarDay;
}

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
    const [size, setSize] = useState<object>();
    const {selectedDayDetails} = useContext(CalendarContext);
    console.log(selectedDayDetails);

    const [medicationTaken, setMedicationTaken] = useState();


    const {putUpdateMedicationDosage} = useContext(ApiContext);
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

    const truncateString = (string: string) => {
        //@ts-ignore
        if (string.length > ref.current.offsetWidth / 25) {
            //@ts-ignore
            return string.slice(0, ref.current.offsetWidth / 25) + "...";
        } else {
            return string;
        }
    }
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
                            let container = document.getElementById("list");
                            let scrollTo = document.getElementById("Taken")
                            // @ts-ignore
                            container.scrollTop = scrollTo.offsetTop;
                        }}>
                            <Badge badgeContent={selectedDayDetails.filter(detail => detail.hasBeenTaken).length}>
                                <Check fontSize={"large"}/>
                            </Badge>
                        </IconButton>
                        <IconButton onClick={() => {
                            let container = document.getElementById("list");
                            let scrollTo = document.getElementById("To-Take")
                            // @ts-ignore
                            container.scrollTop = scrollTo.offsetTop;
                        }}>
                            <Badge
                                badgeContent={selectedDayDetails.filter(detail => !detail.hasBeenTaken && !detail.hasBeenMissed).length}>
                                <WatchLater fontSize={"large"}/>
                            </Badge>
                        </IconButton>
                    </Box>
                    <Box sx={{display: "inline"}}>
                        <IconButton onClick={() => {
                            let container = document.getElementById("list");
                            let scrollTo = document.getElementById("Missed-Medications")
                            // @ts-ignore
                            container.scrollTop = scrollTo.offsetTop;
                        }}>
                            <Badge
                                badgeContent={selectedDayDetails.filter(detail => !detail.hasBeenTaken && detail.hasBeenMissed).length}>
                                <AssignmentLate fontSize={"large"}/>
                            </Badge>
                        </IconButton>
                        <IconButton onClick={() => {
                            let container = document.getElementById("list");
                            let scrollTo = document.getElementById("Upcoming-Refills")
                            // @ts-ignore
                            container.scrollTop = scrollTo.offsetTop;
                        }}>
                            <Badge
                                badgeContent={selectedDayDetails.filter(detail => differenceInDays(new Date(detail.nextFillDay), new Date()) < 7).length}>
                                <Update fontSize={"large"}/>
                            </Badge>
                        </IconButton>
                    </Box>
                </Box>
            </Box>


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

                <ListSubheader sx={{fontSize: '20px', color: 'text.primary', textAlign: 'center'}} id={'Taken'}>Medications
                    Taken</ListSubheader>
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
                                            <Face sx={{color: medicationDosage.medicationOwner.color}}/>
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

                <ListSubheader sx={{fontSize: '20px', color: 'text.primary', textAlign: 'center'}} id={'To-Take'}>Medications
                    To Take</ListSubheader>
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
                                        <Face sx={{color: medicationDosage.medicationOwner.color}}/>
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

                <ListSubheader sx={{fontSize: '20px', color: 'text.primary', textAlign: 'center'}}
                               id={'Missed-Medications'}>Missed Medications</ListSubheader>
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
                                        <Face sx={{color: medicationDosage.medicationOwner.color}}/>
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

                <ListSubheader sx={{fontSize:'20px',color:'text.primary', textAlign:'center'}} id={'Upcoming-Refills'}>Upcoming Refills</ListSubheader>
                {selectedDayDetails.map((medicationDosage, index) => {
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
                                                <Face sx={{color: medicationDosage.medicationOwner.color}}/>
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
                                    <></>
                                )}
                            </ListItem>
                        </>
                    );
                })}
                <Divider/>

            </List>

        </Box>
    );
};

export default DisplayDateDetails;
