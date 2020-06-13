import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './Home';
import SignIn from './Authentication/SignIn';
import SignUp from './Authentication/SignUp';

const BottomTabNavigator = createBottomTabNavigator();
const StackNavigator = createStackNavigator();

const BottomTabRoutes: React.FC = () => {
    return (
        <BottomTabNavigator.Navigator
            initialRouteName="Home"
        >
            <BottomTabNavigator.Screen
                name="Home"
                component={Home}
            />
        </BottomTabNavigator.Navigator>
    )
}

const Routes: React.FC = () => {
    return (
        <StackNavigator.Navigator
            headerMode="none"
        >
            {
                false ?
                    (
                        <>
                            <StackNavigator.Screen
                                name="Tabs"
                                component={BottomTabRoutes}
                            />
                        </>
                    )
                    :
                    (
                        <>
                            <StackNavigator.Screen
                                name="SignIn"
                                component={SignIn}
                            />
                            <StackNavigator.Screen
                                name="SignUp"
                                component={SignUp}
                            />
                        </>
                    )
            }
        </StackNavigator.Navigator>
    )
}

export default Routes;