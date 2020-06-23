import React, { useState, useEffect } from 'react';
import { View, Platform, Alert, RefreshControl, ActivityIndicator } from 'react-native';
import { ScrollabeContainer, Container, Button } from '~/components';
import { Title, Text, Caption } from '~/components/Typography';
import { Header } from '../Home/styles';
import { AntDesign } from '@expo/vector-icons';
import Constants from 'expo-constants';
import api from '~/services/api';
import { useNavigation } from '@react-navigation/native';
import { AuthenticationState } from '~/store/ducks/authentication/types';
import { useSelector } from 'react-redux';
import { ApplicationState } from '~/store';
import { UserContainer, Avatar } from './styles';

interface IColleagueProp {
    id: number,
    first_name: string,
    last_name: string,
    avatar: string,
}

interface IPixelthonProps {
    participants: number,
    is_participant: boolean,
    is_within_the_application_deadline: boolean,
    groups_already_been_defined?: boolean,
    participant?: {
        group: string
    },
    colleagues: IColleagueProp[]
}

interface IUserItemProps {
    data: IColleagueProp
}

const UserItem: React.FC<IUserItemProps> = React.memo((props) => {
    const navigation = useNavigation();

    function handleOpenProfile() {
        navigation.navigate("User", { id: props.data.id });
    }

    return (
        <UserContainer onPress={handleOpenProfile}>
            <Avatar />
            <Text>{props.data.first_name} {props.data.last_name}</Text>
        </UserContainer>
    )
})

const Pixelthon: React.FC = () => {
    const navigation = useNavigation();

    /**
     * Store 
     */
    const authentication: AuthenticationState = useSelector((state: ApplicationState) => state.authentication);

    /**
     * States
     */
    const [loadingData, setLoadingData] = useState<boolean>(true);
    const [data, setData] = useState<IPixelthonProps | null>(null)
    const [refreshing, setRefreshing] = useState<boolean>(false);

    const [loading, setLoading] = useState<boolean>(false);

    const [timeRemaining, setTimeRemaining] = useState<string>("...");

    /**
     * Effects
     */
    useEffect(() => {
        setLoadingData(true);
        loadData();
    }, [])

    useEffect(() => {
        calculateTimeRemaining();
    }, [])

    /**
     * Functions
     */
    function loadData() {
        api.get('/pixelthon/participant', {
            headers: {
                date: (new Date()).toUTCString(),
                Authorization: `Bearer ${authentication.token}`
            }
        })
            .then((response) => {
                console.log(response.data);
                setData(response.data);
            })
            .catch((error) => {
                console.log(error.response);
                navigation.goBack();
                Alert.alert("Erro", "Não foi possível carregar as informações do Pixelthon, tente novamente!");
            })
            .finally(() => {
                setLoadingData(false);
                setRefreshing(false);
            });
    }

    function onRefresh() {
        setRefreshing(true);
        calculateTimeRemaining();
        loadData();
    }

    function calculateTimeRemaining() {
        // @ts-ignore
        var delta = Math.abs(new Date(2020, 6, 22, 13, 0) - new Date()) / 1000;

        var days = Math.floor(delta / 86400);
        delta -= days * 86400;

        var hours = Math.floor(delta / 3600) % 24;
        delta -= hours * 3600;

        var minutes = Math.floor(delta / 60) % 60;


        if (days >= 1) {
            setTimeRemaining(`${days} ${days == 1 ? "dia" : "dias"}`)
        } else {
            if (hours >= 1) {
                setTimeRemaining(`${hours} ${hours == 1 ? "hora" : "horas"}`)
            } else {
                if (minutes >= 1) {
                    setTimeRemaining(`${minutes} ${minutes == 1 ? "minuto" : "minutos"}`)
                } else {
                    setTimeRemaining("entrega")
                }

            }
        }

    }

    /**
     * Handles
     */
    function handleSubscribe() {
        Alert.alert("Inscrição para o Pixelthon", "Tem certeza que você deseja se inscrever para participar do Pixelthon? Antes de inscrever-se, leia atentamente todas as informações disponíveis nesta página!", [
            {
                text: "Não",
                onPress: () => null,
                style: "cancel"
            },
            {
                text: "Sim",
                onPress: () => {
                    setLoading(true);

                    api.post(`/pixelthon/participant`, null, {
                        headers: {
                            date: (new Date()).toUTCString(),
                            Authorization: `Bearer ${authentication.token}`
                        }
                    })
                        .then((response) => {
                            console.log(response.data);
                            Alert.alert("Sucesso!", "Sua inscrição para o Pixelthon foi confirmada, aguarde para mais informações!");
                            setData((oldState: any) => {
                                return { ...oldState, is_participant: true }
                            });
                        })
                        .catch((error) => {
                            console.log(error.response);
                            const response = error.response;

                            if (response.status == 403) {
                                if (response.data.error == "MAX_NUMBER_PARTICIPANTS_REACHED") {
                                    Alert.alert("Número máximo de participantes atingido",
                                        "Ooops! Parece que o número máximo de participantes permitidos para participar do Pixelthon já foi atingido :/");
                                    setData((oldState: any) => {
                                        return { ...oldState, participants: 1000 }
                                    });
                                } else if (response.data.error == "OUT_OF_REGISTRATION_DATE") {
                                    Alert.alert("Fora do prazo de inscrição",
                                        "O prazo de inscrição para o Pixelthon começa às 22h30 do dia 09/07 e vai até às 23h59 do dia 10/07!");
                                    setData((oldState: any) => {
                                        return { ...oldState, is_within_the_application_deadline: false }
                                    });
                                }
                            } else {
                                Alert.alert("Erro...", "Parece que estamos com um problema em sua inscrição, tente novamente mais tarde!");
                            }
                        })
                        .finally(() => setLoading(false));
                },
            }
        ])
    }


    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator size={70} />
            </View>
        )
    }

    return (
        <View style={{ flex: 1 }}>
            <Header style={{ paddingTop: Platform.OS == "ios" ? Constants.statusBarHeight + 20 : 20, paddingBottom: 20 }}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <AntDesign name="codesquare" color="white" size={30} />
                    <Title style={{ marginBottom: 0, marginLeft: 10 }} size={30}>Pixelthon</Title>
                </View>
            </Header>
            <ScrollabeContainer refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
                <Container>
                    {
                        loadingData ?
                            <ActivityIndicator style={{ alignSelf: "center", marginTop: 30 }} size={40} />
                            :
                            <>
                                {
                                    (!data?.groups_already_been_defined) &&
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

                                        {
                                            data?.is_within_the_application_deadline ?
                                                data?.participants >= 72 ?
                                                    <View style={{ marginTop: 20 }}>
                                                        <Text style={{ color: "#F45656" }}>
                                                            Poxa, que pena! O Pixelthon já atingiu o número máximo de inscritos e infelizmente não está aceitando novas inscrições!
                                            </Text>
                                                    </View>
                                                    :
                                                    data?.is_participant ?
                                                        <View style={{ marginTop: 20 }}>
                                                            <Text style={{ color: "#1EE21B" }}>
                                                                Sua inscrição para o Pixelthon está confirmada, aguarde para mais informações!
                                                </Text>
                                                        </View>
                                                        :
                                                        <View style={{ marginTop: 20 }}>
                                                            <Button
                                                                label="quero participar"
                                                                color="secondary"
                                                                loading={loading}
                                                                onPress={handleSubscribe}
                                                            />
                                                            <Caption style={{ fontSize: 10, marginTop: 10 }}>
                                                                As inscrições estarão abertas a partir das 22h30 do dia 09/07 até às 23h59 do dia 10/07.
                                                </Caption>
                                                        </View>
                                                :
                                                <View style={{ marginTop: 20 }}>
                                                    <Text style={{ color: "#F45656" }}>
                                                        Você está fora do prazo de inscrição para o Pixelthon! Volte aqui a partir das 22h30 do dia 09/07 até às 23h59 do dia 10/07.
                                        </Text>
                                                </View>
                                        }
                                    </View>
                                }

                                {
                                    (data?.groups_already_been_defined && data?.participant?.group == null) &&
                                    <View>
                                        <Text>
                                            Sua inscrição ao Pixelthon foi confirmada com sucesso, no entanto você ainda não foi adicionado a nenhum grupo.
                                            Aguarde ser inserido em um grupo para conhecer seus colegas de equipe... Caso você não seja inserido em nenhum grupo até dia 12/07, entre em contato via e-mail.
                                        </Text>
                                        <Caption style={{ marginTop: 10 }}>pixelinit@ejpixel.com.br</Caption>
                                    </View>
                                }

                                {
                                    (data?.groups_already_been_defined && data?.participant?.group != null) &&
                                    <View>
                                        <Title size={60} style={{ marginBottom: 0 }}>{timeRemaining}</Title>
                                        <Caption>Restando para a conclusão do Pixelthon.</Caption>

                                        <Title style={{ marginTop: 30 }}>Você faz parte do grupo {data?.participant.group}, conheça seus colegas de equipe.</Title>

                                        {
                                            data?.colleagues.map(colleague => (
                                                <UserItem key={colleague.id} data={colleague} />
                                            ))
                                        }

                                        <Caption style={{ textAlign: "justify" }}>Para facilitar a comunicação, um grupo no WhatsApp será criado para este grupo pela equipe de produção do Pixelthon, aguarde!</Caption>
                                    </View>
                                }
                            </>
                    }
                </Container>
            </ScrollabeContainer>
        </View>
    );
}

export default Pixelthon;