import React, {useState} from 'react';
import {ApplicationProvider, Layout} from "@ui-kitten/components";
import * as eva from '@eva-design/eva';
import Navigation from "./Navigation/Navigation";
import {Platform, SafeAreaView, View} from 'react-native';
import customTheme from './Styles/theme';
import * as SecureStore from 'expo-secure-store';
import {useOnMount} from "./Hooks/MiscHooks";
import MasterProvider from "./Context/MasterProvider";
import AndroidStatusBar from "./Components/Misc/AndroidStatusBar";


export const ThemeContext = React.createContext({
    theme: 'light',
    toggleTheme: () => {
    },
});

export default function App() {
    {/*{eva.dark} for dark mode*/
    }


    const [theme, setTheme] = useState('light');

    const toggleTheme = async () => {
        const nextTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(nextTheme);
        await SecureStore.setItemAsync("moonmeds-THEME", nextTheme)
    }

    useOnMount(() => {
        SecureStore.getItemAsync("moonmeds-THEME").then(response => {
            if (response) {
                setTheme(response)
            }
        })
    })

    return (
        <ThemeContext.Provider value={{theme, toggleTheme}}>
            {/*// @ts-ignore*/}
            <ApplicationProvider {...eva} theme={{...eva[theme], ...customTheme}}>
                <Layout style={{flex: 1, height: "100%"}}>
                    <SafeAreaView style={{flex: 1}}>
                        <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                            <MasterProvider>
                                {Platform.OS === "android"? <AndroidStatusBar/>:<View/>}
                                <Navigation/>
                            </MasterProvider>
                        </Layout>
                    </SafeAreaView>
                </Layout>
            </ApplicationProvider>
        </ThemeContext.Provider>
    );
}