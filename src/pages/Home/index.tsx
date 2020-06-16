import React from 'react';
import { StatusBar, View, TouchableOpacity } from 'react-native';
import { ScrollabeContainer, Container } from '~/components';
import { Header, LogoImage, ProfileImage, UserName, SpeechContainer, SpeechTime, SpeechName, SpeechPresenter } from './styles';
import { useTheme } from 'styled-components';
import { Title, Text, Caption } from '~/components/Typography';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface ISpeech {
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
        speech_day: new Date("2020-07-09 18:45"),
        name: "Nome da palestra",
        presenter: "Nome da pessoa",
        presenter_description: "programador na Netflix",
        speech_description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    },
    {
        category: "technician",
        speech_day: new Date("2020-07-09 19:45"),
        name: "Nome da palestra",
        presenter: "Nome da pessoa",
        presenter_description: "programador na Netflix",
        speech_description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    },
    {
        category: "market",
        speech_day: new Date("2020-07-09 20:45"),
        name: "Nome da palestra",
        presenter: "Nome da pessoa",
        presenter_description: "programador na Netflix",
        speech_description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    },
    {
        category: "academic",
        speech_day: new Date("2020-07-16 18:45"),
        name: "Nome da palestra",
        presenter: "Nome da pessoa",
        presenter_description: "programador na Netflix",
        speech_description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    },
    {
        category: "technician",
        speech_day: new Date("2020-07-16 19:45"),
        name: "Nome da palestra",
        presenter: "Nome da pessoa",
        presenter_description: "programador na Netflix",
        speech_description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    },
    {
        category: "market",
        speech_day: new Date("2020-07-16 20:45"),
        name: "Nome da palestra",
        presenter: "Nome da pessoa",
        presenter_description: "programador na Netflix",
        speech_description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    },
    {
        category: "academic",
        speech_day: new Date("2020-07-23 18:45"),
        name: "Nome da palestra",
        presenter: "Nome da pessoa",
        presenter_description: "programador na Netflix",
        speech_description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    },
    {
        category: "technician",
        speech_day: new Date("2020-07-23 19:45"),
        name: "Nome da palestra",
        presenter: "Nome da pessoa",
        presenter_description: "programador na Netflix",
        speech_description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    },
    {
        category: "market",
        speech_day: new Date("2020-07-23 20:45"),
        name: "Nome da palestra",
        presenter: "Nome da pessoa",
        presenter_description: "programador na Netflix",
        speech_description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    },
]

const Home: React.FC = () => {
    const theme = useTheme();

    return (
        <View style={{ flex: 1 }}>
            <Header style={{ display: "flex", paddingBottom: 20, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                <LogoImage />
                <TouchableOpacity activeOpacity={.95} style={{ flexDirection: "row", alignItems: "center" }}>
                    <UserName>
                        Higor Oliveira
                </UserName>
                    <ProfileImage />
                </TouchableOpacity>
            </Header>
            <ScrollabeContainer>
                <StatusBar barStyle="light-content" backgroundColor={theme.colors.primary} />
                <Header>
                    <View style={{ marginTop: 10, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                        <Title size={32} style={{ flex: 1, marginRight: 30 }} numberOfLines={2}>
                            Bem-vindo, Higor Oliveira
                    </Title>

                        <MaterialCommunityIcons name="bell" size={50} color="white" style={{ marginLeft: "auto", transform: [{ rotate: "10deg" }] }} />
                    </View>
                </Header>
                <Container>
                    <Title size={30} style={{ marginBottom: 10 }}>Palestras</Title>

                    <View>
                        <Text size={20}>09/07, quinta-feira</Text>

                        {
                            speeches.filter(speech => speech.speech_day.getDate() === 9).map(speech => (
                                <SpeechContainer speechCategory={speech.category}>
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
                            speeches.filter(speech => speech.speech_day.getDate() === 16).map(speech => (
                                <SpeechContainer speechCategory={speech.category}>
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
                            speeches.filter(speech => speech.speech_day.getDate() === 23).map(speech => (
                                <SpeechContainer speechCategory={speech.category}>
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