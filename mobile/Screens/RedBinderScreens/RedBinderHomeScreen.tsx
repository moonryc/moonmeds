import React, {useContext} from 'react';
import {Text, View} from 'react-native';
import {UserContext} from "../../Context/UserContext";
import {Divider, ListItem} from "@ui-kitten/components";


const RedBinderHomeScreen = ({navigation}: any) => {

    const {usersPeople} = useContext(UserContext);

    return (
        <View>
            {usersPeople.map(person => {
                return (
                    <>
                        <ListItem
                            title={person.name}
                            description={person.color}
                        />
                        <Divider/>
                    </>
                )
            })}
        </View>
    );
};

export default RedBinderHomeScreen;
