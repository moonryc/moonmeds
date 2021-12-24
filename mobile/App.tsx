import React from 'react';
import {UserContextContainer} from "./Context/UserContext";
import ApiContextContainer from "./Context/ApiContext";
import MedicationContextContainer from "./Context/MedicationContext";
import StoreContextContainer from "./Store/StoreContext";
import {ApplicationProvider, Layout} from "@ui-kitten/components";
import * as eva from '@eva-design/eva';
import Navigation from "./Navigation/Navigation";
import {SafeAreaView} from 'react-native';
import {NavigationContainer} from "@react-navigation/native";
import {NativeBaseProvider} from 'native-base';


export default function App() {
    {/*{eva.dark} for dark mode*/
    }
    return (

        <ApplicationProvider {...eva} theme={eva.dark}>
            <SafeAreaView style={{flex: 1, backgroundColor: "#222b45"}}>
                <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <UserContextContainer>
                        <MedicationContextContainer>
                            <ApiContextContainer>
                                <StoreContextContainer>
                                    <NavigationContainer>
                                        <Navigation/>
                                    </NavigationContainer>
                                </StoreContextContainer>
                            </ApiContextContainer>
                        </MedicationContextContainer>
                    </UserContextContainer>
                </Layout>
            </SafeAreaView>
        </ApplicationProvider>

    );
}