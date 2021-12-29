import React from 'react';

import {Text, View} from 'react-native';
import {NavigationContainer} from "@react-navigation/native";
import StoreContextContainer from "../Store/StoreContext";
import ApiContextContainer from "./ApiContext";
import MedicationContextContainer from "./MedicationContext";
import {QueryClient, QueryClientProvider} from "react-query";
import {UserContextContainer} from "./UserContext";

const MasterProvider = (props:any) => {

    const queryClient = new QueryClient();

    return (

            <QueryClientProvider client={queryClient}>
                <UserContextContainer>
                    <MedicationContextContainer>
                        <ApiContextContainer>
                            <StoreContextContainer>
                                <NavigationContainer>
                                    {props.children}
                                </NavigationContainer>
                            </StoreContextContainer>
                        </ApiContextContainer>
                    </MedicationContextContainer>
                </UserContextContainer>
            </QueryClientProvider>

    );
};

export default MasterProvider;
