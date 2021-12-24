import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {Calendar} from "@ui-kitten/components";
import {isToday} from "date-fns";

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#1a2139',
        flex: 1,
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

    const [date, setDate] = React.useState(null);


    const DayCell = ({date}: any, style: any) => {



        return (
            <React.Fragment>
                {isToday(new Date(date))?
                    <View
                        style={[styles.dayContainer, style.container]}>
                        <Text style={style.text}>{`${date.getDate()}`}</Text>
                    </View>:<View
                        style={[styles.dayContainer, style.container]}>
                        <Text style={style.text}>{`${date.getDate()}`}</Text>
                        <Text style={[style.text, styles.value]}>
                            {`${100 * date.getDate() + Math.pow(date.getDate(), 2)}$`}
                        </Text>
                    </View>
                }
            </React.Fragment>
        )
    };


    return (
        <ScrollView style={styles.container}>
            <View style={{alignItems: "center", minHeight: "100%", justifyContent: "space-evenly"}}>
                <Calendar
                    date={date}
                    onSelect={nextDate => setDate(nextDate)}
                    renderDay={DayCell}
                />
            </View>
        </ScrollView>
    );
};

export default CalendarHomeScreen;
