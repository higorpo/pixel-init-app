import React from 'react';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Welcome from './Authentication/Welcome';
import SignIn from './Authentication/SignIn';
import SignUp from './Authentication/SignUp';
import Home from './Home';
import RecoverPass from './Authentication/SignIn/pages/RecoverPass';
import { MaterialCommunityIcons } from '@expo/vector-icons';

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
                options={{
                    tabBarLabel: "Início",
                    tabBarIcon: ({ size, color, focused }) => {
                        return <MaterialCommunityIcons name="home" size={size} color={color} />
                    }
                }}
            />
        </BottomTabNavigator.Navigator>
    )
}

const Routes: React.FC = () => {
    return (
        <StackNavigator.Navigator
            headerMode="none"
            screenOptions={{
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                gestureEnabled: true,
                gestureDirection: "horizontal"
            }}
        >
            {
                true ?
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
                                name="Welcome"
                                component={Welcome}
                                options={{
                                    headerTitle: "Bem-vindo"
                                }}
                            />
                            <StackNavigator.Screen
                                name="SignIn"
                                component={SignIn}
                                options={{
                                    headerTitle: "Entrar"
                                }}
                            />
                            <StackNavigator.Screen
                                name="RecoverPass"
                                component={RecoverPass}
                                options={{
                                    headerTitle: "Recuperar senha"
                                }}
                            />
                            <StackNavigator.Screen
                                name="SignUp"
                                component={SignUp}
                                options={{
                                    headerTitle: "Registrar-se"
                                }}
                            />
                        </>
                    )
            }
        </StackNavigator.Navigator>
    )
}

export default Routes;