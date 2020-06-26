import React, { useMemo } from 'react';
import { View, StatusBar, Platform, Alert } from 'react-native';
import { ScrollabeContainer, Container, BackButtonNavigator, Button } from '~/components';
import { useTheme } from 'styled-components';
import { useRoute } from '@react-navigation/native';
import { ISpeech } from '~/pages/Home';
import { Header } from './styles';
import { Title, Text, Caption } from '~/components/Typography';
import Constants from 'expo-constants';
import * as Calendar from 'expo-calendar';
import * as Permissions from 'expo-permissions';


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


    /**
     * Functions
     */
    async function getDefaultCalendar() {
        const calendars = await Calendar.getCalendarsAsync();

        // Verifica se o calendário do Pixel Init foi criado, se não foi, cria-o.
        const pixelInitCalendar = calendars.find(calendar => calendar.name == "pixel-init-2020");

        if (pixelInitCalendar) {
            return pixelInitCalendar;
        } else {
            await Calendar.createCalendarAsync({
                title: 'Pixel Init',
                color: '#327E83',
                entityType: Calendar.EntityTypes.EVENT,
                //@ts-ignore
                sourceId: undefined,
                source: { isLocalAccount: true, name: 'Pixel Init' } as Calendar.Source,
                name: 'pixel-init-2020',
                ownerAccount: 'personal',
                accessLevel: Calendar.CalendarAccessLevel.READ,
            });

            return calendars.find(calendar => calendar.name == "pixel-init-2020");
        }
    }

    /**
     * Handles
     */

    async function handleConfirmPresence() {
        const { status } = await Permissions.askAsync(Permissions.CALENDAR, Permissions.NOTIFICATIONS);
        if (status === 'granted') {
            const defaultCalendar = Platform.OS == "ios" ? await Calendar.getDefaultCalendarAsync() : await getDefaultCalendar();

            if (defaultCalendar) {
                // Verifica se o evento já foi criado, se já foi, não cria.
                const events = await Calendar.getEventsAsync([defaultCalendar.id], speech.speech_day, new Date(new Date(speech.speech_day).setHours(speech.speech_day.getHours() + 1)));

                const event = events.find(event => event.title == `Pixel Init - Palestra: ${speech.name}`);

                if (event) {
                    Alert.alert("", "Você já confirmou presença neste evento e ele já foi adicionado a sua agenda!");
                } else {
                    await Calendar.createEventAsync(defaultCalendar.id, {
                        title: `Pixel Init - Palestra: ${speech.name}`,
                        startDate: speech.speech_day,
                        endDate: new Date(new Date(speech.speech_day).setHours(speech.speech_day.getHours() + 1)),
                        location: 'pixelinit.ejpixel.com.br',
                        notes: `Acompanhe a palestra ${speech.name} de ${speech.presenter} através do canal do Youtube do Pixel Init. Os links serão disponibilizados através do e-mail (pixelinit@ejpixel.com.br), site (pixelinit.ejpixel.com.br) e Instagram (@pixelinit)!`,
                        timeZone: 'GMT-3',
                        endTimeZone: 'GMT-3',
                        url: 'pixelinit.ejpixel.com.br',
                        organizerEmail: 'pixelinit@ejpixel.com.br',
                        accessLevel: Calendar.CalendarAccessLevel.READ,
                        guestsCanModify: false,
                        guestsCanInviteOthers: true,
                        guestsCanSeeGuests: true,
                        organizer: "Pixel Init",
                        status: Calendar.EventStatus.CONFIRMED,
                        alarms: [
                            {
                                relativeOffset: 0,
                                method: Calendar.AlarmMethod.ALARM
                            },
                            {
                                relativeOffset: -10,
                                method: Calendar.AlarmMethod.ALERT
                            },
                            {
                                relativeOffset: -30,
                                method: Calendar.AlarmMethod.ALERT
                            },
                            {
                                relativeOffset: -60 * 3,
                                method: Calendar.AlarmMethod.ALERT
                            },
                        ]
                    })

                    Alert.alert("", "Evento adicionado a sua agenda com sucesso!");
                }
            } else {
                Alert.alert("", "Não é possível adicionar este evento a sua agenda!")
            }
        } else {
            Alert.alert("Erro", "Você precisa permitir o acesso a sua agenda para continuar!");
        }
    }
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
                    onPress={handleConfirmPresence}
                />
            </View>
        </View>
    );
}

export default Speech;