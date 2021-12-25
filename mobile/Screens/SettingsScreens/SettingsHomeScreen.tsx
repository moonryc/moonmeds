import React from 'react';
import {Divider, Menu, MenuItem} from "@ui-kitten/components";
import ScrollableLayout from "../../Components/Misc/ScrollableLayout";
import {CommonStyles} from "../../Styles/CommonStyles";



const SettingsHomeScreen = ({navigation}:any) => {
    return (
        <ScrollableLayout>

            <MenuItem style={CommonStyles.listItem} title='Dev Tools' onPress={()=> navigation.navigate("Devtools")}/>
            <Divider/>
            <MenuItem style={CommonStyles.listItem} title='Account Settings' onPress={()=> navigation.navigate("Account Settings")}/>
            <Divider/>
            <MenuItem style={CommonStyles.listItem} title='Notifications' onPress={()=> navigation.navigate("Notifications")}/>
            <Divider/>
            <MenuItem style={CommonStyles.listItem} title='Theme' onPress={()=> navigation.navigate("Theme")}/>
            <Divider/>
            <MenuItem style={CommonStyles.listItem} title='Logout' onPress={()=> {}}/>
            <Divider/>

        </ScrollableLayout>
    );
};

export default SettingsHomeScreen;
