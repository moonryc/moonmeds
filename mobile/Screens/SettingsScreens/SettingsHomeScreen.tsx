import React from 'react';
import {Divider, Menu, MenuItem} from "@ui-kitten/components";



const SettingsHomeScreen = ({navigation}:any) => {
    return (
        <React.Fragment>
        <Menu>
            <MenuItem title='Dev Tools' onPress={()=> navigation.navigate("Devtools")}/>
            <MenuItem title='Account Settings' onPress={()=> navigation.navigate("Account Settings")}/>
            <MenuItem title='Notifications' onPress={()=> navigation.navigate("Notifications")}/>
            <MenuItem title='Theme' onPress={()=> navigation.navigate("Theme")}/>
            <MenuItem title='Logout' onPress={()=> {}}/>
        </Menu>
        </React.Fragment>
    );
};

export default SettingsHomeScreen;
