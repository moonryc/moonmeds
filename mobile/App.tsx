import React from 'react';
import {UserContextContainer} from "./Context/UserContext";
import ApiContextContainer from "./Context/ApiContext";
import MedicationContextContainer from "./Context/MedicationContext";
import StoreContextContainer from "./Store/StoreContext";
import {ApplicationProvider, Layout} from "@ui-kitten/components";
import * as eva from '@eva-design/eva';
import Navigation from "./Navigation/Navigation";
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function App() {
    return (
        <ApplicationProvider {...eva} theme={eva.dark}>
            {/*{eva.dark} for dark mode*/}
        <SafeAreaProvider>
            <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <UserContextContainer>
                    <MedicationContextContainer>
                        <ApiContextContainer>
                            <StoreContextContainer>
                                <Navigation/>
                            </StoreContextContainer>
                        </ApiContextContainer>
                    </MedicationContextContainer>
                </UserContextContainer>
            </Layout>
        </SafeAreaProvider>
        </ApplicationProvider>
    );
}