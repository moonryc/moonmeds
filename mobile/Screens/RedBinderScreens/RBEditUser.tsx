import React from 'react';

import {Text, View} from 'react-native';
import ScrollableLayout from "../../Components/Misc/ScrollableLayout";
import {Divider, Input, MenuItem, Radio} from "@ui-kitten/components";

const RBEditUser = () => {

    const [value, setValue] = React.useState('');

    return (
        <ScrollableLayout>



            <Input
                placeholder='Change Profile name'
                value={value}
                onChangeText={nextValue => setValue(nextValue)}
            />

            <Radio>Red</Radio>
            <Radio>Green</Radio>
            <Radio>Blue</Radio>
            <Radio>Yellow</Radio>
            <Radio>Orange</Radio>
            <Radio>Purple</Radio>
            <Radio>White</Radio>


            <Divider/>
            <MenuItem title={"Delete User"} onPress={()=>{
                //@ts-ignore
                navigation.navigate("Delete User", {headerName:"Edit User"})
            }}/>
            <Divider/>
        </ScrollableLayout>
    );
};

export default RBEditUser;
