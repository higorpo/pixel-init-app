import React, { useState, useEffect } from 'react';
import { View, StatusBar, Alert, ActivityIndicator, RefreshControl } from 'react-native';
import { ScrollabeContainer, BackButtonNavigator } from '~/components';
import { useTheme } from 'styled-components';
import api from '~/services/api';
import { AuthenticationState } from '~/store/ducks/authentication/types';
import { useSelector } from 'react-redux';
import { ApplicationState } from '~/store';
import { useRoute, useNavigation } from '@react-navigation/native';
import { UserDetails, Avatar, ActionButton } from './styles';
import { Text, Title, Caption } from '~/components/Typography';
import { Linking } from 'expo';

interface IUser {
    id: number,
    email: string,
    first_name: string,
    last_name: string,
    avatar: string | null,
    whatsapp: string,
    linkedin_url: string | null,
    github_url: string | null,
    about: string | null,
    work: string | null,
    is_connected_with_user: boolean,
    connection_is_requested: boolean
}

interface IUserRouteParams {
    id: number
}

const User: React.FC = () => {
    const theme = useTheme();
    const navigation = useNavigation();
    const route = useRoute();
    const params = route.params as IUserRouteParams;

    /**
     * Stored state
     */
    const authentication: AuthenticationState = useSelector((state: ApplicationState) => state.authentication);

    /**
     * State
     */
    const [loading, setLoading] = useState<boolean>(true);
    const [refreshing, setRefreshing] = useState<boolean>(false);
    const [data, setData] = useState<IUser | null>(null);

    /**
     * Effect
     */
    useEffect(() => {
        setLoading(true);
        loadData()
            .then((response) => {
                setData(response.data);
            })
            .catch(() => {
                Alert.alert("", "Parece que estamos enfrentando um problema técnico, tente novamente mais tarde!");
                navigation.goBack();
            })
            .finally(() => setLoading(false));
    }, [])

    /**
     * Functions
     */
    function loadData() {
        return api.get(`/users/${params.id}`, {
            headers: {
                Authorization: `Bearer ${authentication.token}`
            }
        })
    }

    function onRefresh() {
        setRefreshing(true);
        loadData()
            .then((response) => {
                setData(response.data);
            })
            .finally(() => setRefreshing(false));
    }

    /**
     * Handles
     */
    function handleConnectUser() {
        api.post(`/users/${data?.id}/connections`, null, {
            headers: {
                Authorization: `Bearer ${authentication.token}`
            }
        })
            .then(() => {
                // @ts-ignore
                setData(oldState => {
                    return { ...oldState, connection_is_requested: true };
                })
            })
            .catch(() => {
                Alert.alert("Parece que estamos enfrentando um problema técnico, tente novamente mais tarde!")
            })
    }

    function handleOpen(open: string) {
        switch (open) {
            case 'whatsapp':
                Linking.openURL(`https://wa.me/+55${data?.whatsapp.replace(/-/g, "")}`)
                break;
            case 'github':
                let github = data?.github_url as string;
                if (!/(http(s?)):\/\//i.test(github)) {
                    github = `https://${github}`;
                }
                Linking.openURL(github);
                break;
            case 'linkedin':
                let linkedin = data?.linkedin_url as string;
                if (!/(http(s?)):\/\//i.test(linkedin)) {
                    linkedin = `https://${linkedin}`;
                }
                Linking.openURL(linkedin);
                break;
            case 'email':
                Linking.openURL(`mailto:${data?.email}`)
                break;
        }
    }

    return (
        <View style={{ flex: 1 }}>
            <StatusBar barStyle="light-content" backgroundColor={theme.colors.background} />
            <View style={{ padding: 20, backgroundColor: theme.colors.background }}>
                <BackButtonNavigator />
            </View>
            {
                loading ?
                    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                        <ActivityIndicator size={40} />
                    </View>
                    :
                    <ScrollabeContainer
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={onRefresh}
                            />
                        }
                        style={{ padding: 20, paddingTop: 0 }}>
                        <UserDetails>
                            <Avatar />
                            <Title size={30} style={{ flex: 1, marginBottom: 0 }}>
                                {data?.first_name} {data?.last_name}
                            </Title>
                        </UserDetails>
                        {
                            authentication.user?.id == data?.id ?
                                <ActionButton style={{ backgroundColor: theme.colors.grey3 }}>
                                    <Text>Editar perfil</Text>
                                </ActionButton>
                                :
                                data?.is_connected_with_user ?
                                    <Text style={{ marginTop: 10, textAlign: "justify" }}>Você e {data?.first_name} estão conectados, parabéns pelo networking!</Text>
                                    :
                                    data?.connection_is_requested ?
                                        <Text style={{ marginTop: 10, textAlign: "justify" }}>Seu pedido foi enviado, agora aguarde que {data?.first_name} aceite seu pedido de conexão!</Text>
                                        :
                                        <ActionButton onPress={handleConnectUser}>
                                            <Text>Conectar</Text>
                                        </ActionButton>
                        }

                        <Title style={{ marginTop: 30, marginBottom: 5 }}>Sobre</Title>
                        {
                            data?.about ?
                                <Text>{data?.about}</Text>
                                :
                                <Caption>
                                    {
                                        authentication.user?.id == data?.id ?
                                            "Você ainda não adicionou esta informação a seu perfil, adicione-a!"
                                            :
                                            "Este usuário ainda não adicionou esta informação a seu perfil."
                                    }
                                </Caption>
                        }

                        <Title style={{ marginTop: 30, marginBottom: 5 }}>Trabalho</Title>
                        {
                            data?.work ?
                                <Text>{data?.work}</Text>
                                :
                                <Caption>
                                    {
                                        authentication.user?.id == data?.id ?
                                            "Você ainda não adicionou esta informação a seu perfil, adicione-a!"
                                            :
                                            "Este usuário ainda não adicionou esta informação a seu perfil."
                                    }
                                </Caption>
                        }

                        <Title style={{ marginTop: 30, marginBottom: 5 }}>Contato</Title>
                        {
                            data?.is_connected_with_user ?
                                <>
                                    {
                                        data?.whatsapp &&
                                        <ActionButton onPress={() => handleOpen('whatsapp')} style={{ backgroundColor: "#34AF23" }}>
                                            <Text>WhatsApp</Text>
                                        </ActionButton>
                                    }
                                    {
                                        data?.linkedin_url &&
                                        <ActionButton onPress={() => handleOpen('linkedin')} style={{ backgroundColor: "#0E76A8" }}>
                                            <Text>LinkedIn</Text>
                                        </ActionButton>
                                    }
                                    {
                                        data?.email &&
                                        <ActionButton onPress={() => handleOpen('email')} style={{ backgroundColor: "#D44638" }}>
                                            <Text>E-mail</Text>
                                        </ActionButton>
                                    }
                                    {
                                        data?.github_url &&
                                        <ActionButton onPress={() => handleOpen('github')} style={{ backgroundColor: "#000" }}>
                                            <Text>GitHub</Text>
                                        </ActionButton>
                                    }
                                </>
                                :
                                <Caption>Você não pode ver as informações de contato de {data?.first_name} pois vocês não estão conectados!</Caption>
                        }
                    </ScrollabeContainer>
            }
        </View>
    );
}

export default User;