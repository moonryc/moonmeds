import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";

export const CalendarStack = createNativeStackNavigator()
export const RedBinderStack = createNativeStackNavigator()
export const TodaysDosagesStack = createNativeStackNavigator()
export const SettingsStack = createNativeStackNavigator()
export const {Navigator, Screen} = createBottomTabNavigator();
