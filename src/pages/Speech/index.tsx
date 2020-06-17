import React, { useMemo } from 'react';
import { View, StatusBar, Platform } from 'react-native';
import { ScrollabeContainer, Container, BackButtonNavigator, Button } from '~/components';
import { useTheme } from 'styled-components';
import { useRoute } from '@react-navigation/native';
import { ISpeech } from '~/pages/Home';
import { Header } from './styles';
import { Title, Text, Caption } from '~/components/Typography';
import Constants from 'expo-constants';

interface ISpeechRouteParams {
    speech: ISpeech
}

const Speech: React.FC = () => {
    const theme = useTheme();
    const route = useRoute();
    const params = route.params as ISpeechRouteParams;

    const speech = params.speech;

    /**
     * Memos
     */
    const color = useMemo(() => {
        return speech.category == "academic" ? "#B04462" : speech.category == "technician" ? "#2D9CDB" : "#9B51E0"
    }, [speech]);

    const categoryTitle = useMemo(() => {
        switch (speech.category) {
            case "academic":
                return "Acadêmico";
            case "technician":
                return "Técnico";
            case "market":
                return "Mercado";
        }
    }, [speech]);

    const categoryDescription = useMemo(() => {
        switch (speech.category) {
            case "academic":
                return "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";
            case "technician":
                return "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";
            case "market":
                return "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";
        }
    }, [speech]);

    return (
        <View style={{ flex: 1 }}>
            <ScrollabeContainer>
                <StatusBar barStyle="light-content" backgroundColor={color} />
                <Header style={{ paddingTop: Platform.OS == "ios" ? Constants.statusBarHeight + 20 : 20, backgroundColor: color }}>
                    <BackButtonNavigator color="white" />
                    <Title style={{ marginTop: 10, marginBottom: 0 }} size={30}>{categoryTitle}</Title>
                    <Text>{categoryDescription}</Text>
                </Header>
                <Container>
                    <Caption>
                        Apresentado por {speech.presenter}, {speech.presenter_description}
                    </Caption>

                    <Title style={{ marginTop: 20 }} size={30}>{speech.name}</Title>
                    <Text style={{ textAlign: "justify" }}>{speech.speech_description}</Text>
                </Container>
            </ScrollabeContainer>
            <View style={{
                padding: 20,
                borderTopWidth: 1,
                borderTopColor: "rgba(255,255,255,0.1)"
            }}>
                <Button
                    label="confirmar presença"
                    color="secondary"
                    textColor={color}
                />
            </View>
        </View>
    );
}

export default Speech;