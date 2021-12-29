import React, {useContext, useState} from 'react';
import {Divider, Menu, MenuItem, Toggle} from "@ui-kitten/components";
import ScrollableLayout from "../../Components/Misc/ScrollableLayout";
import {CommonStyles} from "../../Styles/CommonStyles";
import {ThemeContext} from "../../App";



const SettingsHomeScreen = ({navigation}:any) => {




    return (
        <ScrollableLayout>

            <Divider/>
            <MenuItem style={CommonStyles.listItem} title='Dev Tools' onPress={()=> navigation.navigate("Devtools")}/>
            <Divider/>
            <MenuItem style={CommonStyles.listItem} title='Account Settings' onPress={()=> navigation.navigate("Account Settings")}/>
            <Divider/>
            <MenuItem style={CommonStyles.listItem} title='Notifications' onPress={()=> navigation.navigate("Notifications")}/>
            <Divider/>
            <MenuItem style={CommonStyles.listItem} title='Logout' onPress={()=> {}}/>
            <Divider/>



        </ScrollableLayout>
    );
};

export default SettingsHomeScreen;
