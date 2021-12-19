import React, {useContext} from 'react';

import {ScrollView, Text, View} from 'react-native';
import {UserContext} from "../../Context/UserContext";
import {Divider, List, TouchableRipple} from "react-native-paper";
import {IPersonNameAndColor} from "../../../Types/UserTypes";

const RedBinderListPeople = ({navigation}:any) => {

    const {usersPeople} = useContext(UserContext);



    return (
        <ScrollView>
            {
                usersPeople.map((user:IPersonNameAndColor,index:number)=>{
                    return(
                        <View key={index}>
                        <TouchableRipple
                            onPress={() => {}}
                            rippleColor="rgba(0, 0, 0, .32)"

                        >
                            <List.Item
                                title={user.name}
                                description="Item description"
                                left={props => <List.Icon {...props} icon="face" color={user.color}/>}
                            />
                        </TouchableRipple>
                            <Divider/>
                    </View>
                    )
                })
            }
        </ScrollView>
    );
};

export default RedBinderListPeople;
