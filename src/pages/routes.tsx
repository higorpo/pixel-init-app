import React from 'react';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Welcome from './Authentication/Welcome';
import Home from './Home';
import Speech from './Speech';
import Pixelthon from './Pixelthon';
import { MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AuthenticationState } from '~/store/ducks/authentication/types';
import { useSelector } from 'react-redux';
import { ApplicationState } from '~/store';
import Notifications from './Notifications';
import Publications from './Publications';
import ViewPost from '~/components/Publication/pages/ViewPost';
import CreatePost from '~/pages/Publications/pages/CreatePost';
import User from './User';
import EditProfile from './EditProfile';
import SignIn from './Authentication/SignIn';

const BottomTabNavigator = createBottomTabNavigator();
const StackNavigator = createStackNavigator();

const BottomTabRoutes: React.FC = () => {
    const navigation = useNavigation();

    return (
        <BottomTabNavigator.Navigator
            initialRouteName="Home"
        >
            <BottomTabNavigator.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarLabel: "Cronograma",
                    tabBarIcon: ({ size, color, focused }) => {
                        return (
                            <TouchableOpacity activeOpacity={1} onPress={() => navigation.navigate("Home")}>
                                <MaterialCommunityIcons name="calendar-clock" size={size} color={color} />
                            </TouchableOpacity>
                        )
                    }
                }}
            />
            <BottomTabNavigator.Screen
                name="Pixelthon"
                component={Pixelthon}
                options={{
                    tabBarLabel: "Pixelthon",
                    tabBarIcon: ({ size, color, focused }) => {
                        return (
                            <TouchableOpacity activeOpacity={1} onPress={() => navigation.navigate("Pixelthon")}>
                                <AntDesign name="codesquare" size={size} color={color} />
                            </TouchableOpacity>
                        )
                    }
                }}
            />
            <BottomTabNavigator.Screen
                name="Publications"
                component={Publications}
                options={{
                    tabBarLabel: "Publicações",
                    tabBarIcon: ({ size, color, focused }) => {
                        return (
                            <TouchableOpacity activeOpacity={1} onPress={() => navigation.navigate("Publications")}>
                                <MaterialCommunityIcons name="comment-text" size={size} color={color} />
                            </TouchableOpacity>
                        )
                    }
                }}
            />
        </BottomTabNavigator.Navigator>
    )
}

const Routes: React.FC = () => {
    const authentication: AuthenticationState = useSelector((state: ApplicationState) => state.authentication);

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
                authentication.token != null ?
                    (
                        <>
                            <StackNavigator.Screen
                                name="Tabs"
                                component={BottomTabRoutes}
                            />
                            <StackNavigator.Screen
                                name="Speech"
                                component={Speech}
                            />
                            <StackNavigator.Screen
                                name="Notifications"
                                component={Notifications}
                            />
                            <StackNavigator.Screen
                                name="ViewPost"
                                component={ViewPost}
                            />
                            <StackNavigator.Screen
                                name="CreatePost"
                                component={CreatePost}
                            />
                            <StackNavigator.Screen
                                name="User"
                                component={User}
                            />
                            <StackNavigator.Screen
                                name="EditProfile"
                                component={EditProfile}
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
                                    headerTitle: "Entrar na sua conta"
                                }}
                            />
                        </>
                    )
            }
        </StackNavigator.Navigator>
    )
}

export default Routes;