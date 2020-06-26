import React, { useEffect } from 'react';
import { StatusBar, View, TouchableOpacity, Platform } from 'react-native';
import { ScrollabeContainer, Container } from '~/components';
import { Header, LogoImage, ProfileImage, UserName, SpeechContainer, SpeechTime, SpeechName, SpeechPresenter } from './styles';
import { useTheme } from 'styled-components';
import { Title, Text, Caption } from '~/components/Typography';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Constants from 'expo-constants';
import { AuthenticationState } from '~/store/ducks/authentication/types';
import AuthenticationActions from '~/store/ducks/authentication/actions';
import { useSelector, useDispatch } from 'react-redux';
import { ApplicationState } from '~/store';
import api from '~/services/api';

const userProfile = require("assets/user-profile.png")
export interface ISpeech {
    category: "academic" | "technician" | "market",
    speech_day: Date,
    name: string,
    presenter: string,
    presenter_description: string,
    speech_description: string
}

const speeches: ISpeech[] = [
    {
        category: "academic",
        speech_day: new Date(2020, 6, 9, 18, 45),
        name: "Por que escolher a pesquisa em tecnologia com um mercado tão promissor?",
        presenter: "Jean Martina e Fernanda Gomes",
        presenter_description: "programador na Netflix",
        speech_description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    },
    {
        category: "technician",
        speech_day: new Date(2020, 6, 9, 19, 45),
        name: "Nome da palestra",
        presenter: "Nome da pessoa",
        presenter_description: "programador na Netflix",
        speech_description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    },
    {
        category: "market",
        speech_day: new Date(2020, 6, 9, 20, 45),
        name: "Nome da palestra",
        presenter: "Nome da pessoa",
        presenter_description: "programador na Netflix",
        speech_description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    },
    {
        category: "academic",
        speech_day: new Date(2020, 6, 16, 18, 45),
        name: "Nome da palestra",
        presenter: "Nome da pessoa",
        presenter_description: "programador na Netflix",
        speech_description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    },
    {
        category: "technician",
        speech_day: new Date(2020, 6, 16, 19, 45),
        name: "Nome da palestra",
        presenter: "Nome da pessoa",
        presenter_description: "programador na Netflix",
        speech_description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    },
    {
        category: "market",
        speech_day: new Date(2020, 6, 16, 20, 45),
        name: "Nome da palestra",
        presenter: "Nome da pessoa",
        presenter_description: "programador na Netflix",
        speech_description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    },
    {
        category: "academic",
        speech_day: new Date(2020, 6, 23, 18, 45),
        name: "Nome da palestra",
        presenter: "Nome da pessoa",
        presenter_description: "programador na Netflix",
        speech_description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    },
    {
        category: "technician",
        speech_day: new Date(2020, 6, 23, 19, 45),
        name: "Nome da palestra",
        presenter: "Nome da pessoa",
        presenter_description: "programador na Netflix",
        speech_description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    },
    {
        category: "market",
        speech_day: new Date(2020, 6, 23, 20, 45),
        name: "Nome da palestra",
        presenter: "Nome da pessoa",
        presenter_description: "programador na Netflix",
        speech_description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    },
]

const Home: React.FC = () => {
    const theme = useTheme();
    const navigation = useNavigation();
    const dispatch = useDispatch();

    /**
     * Stored 
     */
    const authentication: AuthenticationState = useSelector((state: ApplicationState) => state.authentication);

    /**
     * Effect
     */
    useEffect(() => {
        api.get(`/users/${authentication?.user?.id}`, {
            headers: {
                Authorization: `Bearer ${authentication.token}`
            }
        })
            .then((response) => {
                console.log(response.data);
                dispatch(AuthenticationActions.setUser(response.data));
            })
    }, [])

    return (
        <View style={{ flex: 1 }}>
            <StatusBar barStyle="light-content" backgroundColor={theme.colors.primary} />

            <Header style={{ paddingTop: Platform.OS == "ios" ? Constants.statusBarHeight + 20 : 20, display: "flex", paddingBottom: 20, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                <LogoImage />
                <TouchableOpacity onPress={() => navigation.navigate("User", { id: authentication.user?.id })} activeOpacity={.95} style={{ flexDirection: "row", alignItems: "center" }}>
                    <UserName>
                        {authentication.user?.first_name}
                    </UserName>
                    <ProfileImage source={authentication?.user?.avatar ? { uri: `http://54.197.125.89:3333/uploads/${authentication?.user?.avatar}` } : userProfile} />
                </TouchableOpacity>
            </Header>
            <ScrollabeContainer>
                <Header>
                    <View style={{ marginTop: 10, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                        <Title size={32} style={{ flex: 1, marginRight: 30 }} numberOfLines={2}>
                            Bem-vindo, {authentication.user?.first_name} {authentication.user?.last_name}
                        </Title>

                        <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate("Notifications")}>
                            <MaterialCommunityIcons name="bell" size={50} color="white" style={{ marginLeft: "auto", transform: [{ rotate: "10deg" }] }} />
                        </TouchableOpacity>
                    </View>
                </Header>
                <Container>
                    <Title size={30} style={{ marginBottom: 10 }}>Palestras</Title>

                    <View>
                        <Text size={20}>09/07, quinta-feira</Text>

                        {
                            speeches.filter(speech => speech.speech_day.getDate() === 9 || speech.speech_day.getDate() === 17).map((speech, index) => (
                                <SpeechContainer key={index} onPress={() => navigation.navigate("Speech", { speech })} speechCategory={speech.category}>
                                    <SpeechTime>{speech.speech_day.getHours()}:{speech.speech_day.getMinutes()}</SpeechTime>
                                    <View style={{ marginLeft: 15, flex: 1 }}>
                                        <SpeechName>{speech.name}</SpeechName>
                                        <SpeechPresenter>apresentado por {speech.presenter}</SpeechPresenter>
                                    </View>
                                </SpeechContainer>
                            ))
                        }

                        <Caption style={{ marginTop: 10 }}>
                            Clique para expandir detalhes.
                        </Caption>
                    </View>

                    <View style={{ marginTop: 40 }}>
                        <Text size={20}>16/07, quinta-feira</Text>

                        {
                            speeches.filter(speech => speech.speech_day.getDate() === 16).map((speech, index) => (
                                <SpeechContainer key={index} onPress={() => navigation.navigate("Speech", { speech })} speechCategory={speech.category}>
                                    <SpeechTime>{speech.speech_day.getHours()}:{speech.speech_day.getMinutes()}</SpeechTime>
                                    <View style={{ marginLeft: 15, flex: 1 }}>
                                        <SpeechName>{speech.name}</SpeechName>
                                        <SpeechPresenter>apresentado por {speech.presenter}</SpeechPresenter>
                                    </View>
                                </SpeechContainer>
                            ))
                        }

                        <Caption style={{ marginTop: 10 }}>
                            Clique para expandir detalhes.
                    </Caption>
                    </View>

                    <View style={{ marginTop: 40 }}>
                        <Text size={20}>23/07, quinta-feira</Text>

                        {
                            speeches.filter(speech => speech.speech_day.getDate() === 23).map((speech, index) => (
                                <SpeechContainer key={index} onPress={() => navigation.navigate("Speech", { speech })} speechCategory={speech.category}>
                                    <SpeechTime>{speech.speech_day.getHours()}:{speech.speech_day.getMinutes()}</SpeechTime>
                                    <View style={{ marginLeft: 15, flex: 1 }}>
                                        <SpeechName>{speech.name}</SpeechName>
                                        <SpeechPresenter>apresentado por {speech.presenter}</SpeechPresenter>
                                    </View>
                                </SpeechContainer>
                            ))
                        }

                        <Caption style={{ marginTop: 10 }}>
                            Clique para expandir detalhes.
                    </Caption>
                    </View>
                </Container>
            </ScrollabeContainer>
        </View>
    );
}

export default Home;