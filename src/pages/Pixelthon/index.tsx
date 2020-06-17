import React from 'react';
import { View, Platform } from 'react-native';
import { ScrollabeContainer, Container, Button } from '~/components';
import { Title, Text, Caption } from '~/components/Typography';
import { Header } from '../Home/styles';
import { AntDesign } from '@expo/vector-icons';
import Constants from 'expo-constants';

const Pixelthon: React.FC = () => {
    return (
        <View style={{ flex: 1 }}>
            <Header style={{ paddingTop: Platform.OS == "ios" ? Constants.statusBarHeight + 20 : 20, paddingBottom: 20 }}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <AntDesign name="codesquare" color="white" size={30} />
                    <Title style={{ marginBottom: 0, marginLeft: 10 }} size={30}>Pixelthon</Title>
                </View>
            </Header>
            <ScrollabeContainer>
                <Container>
                    {
                        false &&
                        <View>
                            <Title style={{ marginBottom: 10 }}>O que é?</Title>
                            <Text>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                            </Text>

                            <Title style={{ marginBottom: 10, marginTop: 20 }}>Quando irá acontecer?</Title>
                            <Text>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            </Text>

                            <Title style={{ marginBottom: 10, marginTop: 20 }}>Prêmio</Title>
                            <Text>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            </Text>

                            <Title style={{ marginBottom: 10, marginTop: 20 }}>Regulamento</Title>
                            <Text>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                            </Text>

                            <Button
                                style={{ marginTop: 20 }}
                                label="quero participar"
                                color="secondary"
                            />
                        </View>
                    }

                    {
                        true &&
                        <View>
                            <Title size={60} style={{ marginBottom: 0 }}>94 horas</Title>
                            <Caption>Restando para a conclusão do Pixelthon.</Caption>

                            <Title style={{ marginTop: 30 }}>Seu grupo</Title>
                        </View>
                    }
                </Container>
            </ScrollabeContainer>
        </View>
    );
}

export default Pixelthon;