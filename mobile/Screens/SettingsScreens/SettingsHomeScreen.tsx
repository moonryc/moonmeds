import React from 'react';
import {View} from "react-native";
import {Menu, MenuItem} from "@ui-kitten/components";



const SettingsHomeScreen = ({navigation}:any) => {
    return (
        <Menu>
            <MenuItem title='Dev Tools' onPress={()=> navigation.navigate("Devtools")}/>
            <MenuItem title='Orders'/>
            <MenuItem title='Transactions'/>
            <MenuItem title='Settings'/>
        </Menu>
    );
};

export default SettingsHomeScreen;
