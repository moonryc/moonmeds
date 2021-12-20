import React from 'react';

import {FlatList, Text, View} from 'react-native';
import {FAB} from "react-native-paper";
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
        fab: {
            position: 'absolute',
            margin: 16,
            right: 0,
            bottom: 0,
        },
    }
)

const Calendar = ({navigation}:any) => {

    const CalendarDay = () => {
      return(
          <View>
          <FAB
              style={styles.fab}
              small
              icon="plus"
              onPress={() => console.log('Pressed')}
          />
          </View>
      )
    }


    return (
        <View>
            <CalendarDay/>
        </View>
    );
};

export default Calendar;
