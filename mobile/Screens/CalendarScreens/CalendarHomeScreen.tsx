import React, {useContext, useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {Calendar, Layout} from "@ui-kitten/components";
import {isSameDay, isToday} from "date-fns";
import {MedicationContext} from "../../Context/MedicationContext";
import {CommonStyles} from "../../Styles/CommonStyles";
import ScrollableLayout from "../../Components/Misc/ScrollableLayout";

const styles = StyleSheet.create({
    missedDayContainer: {
        backgroundColor: "#b03931",
        flex: 1
    },
    missedDay: {
        flex: 1,
        backgroundColor: "#b03931",
        justifyContent: 'center',
        alignItems: 'center',
        aspectRatio: 1,
    },
    refillDayContainer: {
        backgroundColor: "#fde624",
        flex: 1
    },
    refillDay: {
        flex: 1,
        backgroundColor: "#fbe425",
        justifyContent: 'center',
        alignItems: 'center',
        aspectRatio: 1,
    },
    dayContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        aspectRatio: 1,
    },
    value: {
        fontSize: 12,
        fontWeight: '400',
    },
});


const CalendarHomeScreen = () => {

    const {upcomingRefill, missedDosages} = useContext(MedicationContext);

    const [date, setDate] = React.useState(null);


    const DayCell = ({date: datePassed}: any, style: any) => {


        let isMissed = false
        let isRefill = false


        isRefill = upcomingRefill.filter(medication => isSameDay(new Date(medication.nextFillDay), new Date(datePassed))).length > 1
        //@ts-ignore
        isMissed = missedDosages.filter(medication => {
            if (isSameDay(new Date(medication.timeToTake), new Date(datePassed))) {
                return true;
            }
        }).length > 1


        return (
            <React.Fragment>
                {isMissed ?
                    <View
                        style={[styles.missedDay, style.missedDayContainer]}>
                        <Text style={style.text}>{`${datePassed.getDate()}`}</Text>
                    </View> : isRefill ? <View
                        style={[styles.refillDay, style.refillDayContainer]}>
                        <Text style={style.text}>{`${datePassed.getDate()}`}</Text>
                    </View> : <View
                        style={[styles.dayContainer, style.container]}>
                        <Text style={style.text}>{`${datePassed.getDate()}`}</Text>
                        <Text style={[style.text, styles.value]}>
                            {`${isMissed} ${isRefill}`}
                        </Text>
                    </View>
                }
            </React.Fragment>
        )
    };


    return (
        <ScrollableLayout>
            <View style={{alignItems: "center", minHeight: "100%", justifyContent: "space-evenly"}}>
                <Calendar
                    date={date}
                    onSelect={nextDate => setDate(nextDate)}
                    renderDay={DayCell}
                />
            </View>
        </ScrollableLayout>
    );
};


export default CalendarHomeScreen;
