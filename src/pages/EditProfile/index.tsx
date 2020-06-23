import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { BackButtonNavigator, ScrollabeContainer, TextInput } from '~/components';
import { useTheme } from 'styled-components';
import { Avatar, ActionButton } from './styles';
import { Text, Caption } from '~/components/Typography';
import { AuthenticationState } from '~/store/ducks/authentication/types';
import { useSelector } from 'react-redux';
import { ApplicationState } from '~/store';
import api from '~/services/api';
import { useNavigation } from '@react-navigation/native';
import { IUser } from '~/pages/User';

const EditProfile: React.FC = () => {
    const theme = useTheme();
    const navigation = useNavigation();


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

    const [loadingSave, setLoadingSave] = useState<boolean>(false);
    const [aboutInput, setAboutInput] = useState<string>("");
    const [aboutInputErrors, setAboutInputErrors] = useState<string[]>([]);
    const [workInput, setWorkInput] = useState<string>("");
    const [workInputErrors, setWorkInputErrors] = useState<string[]>([]);

    /**
     * Effect
     */
    useEffect(() => {
        setLoading(true);
        loadData()
            .then((response) => {
                setData(response.data);
                setAboutInput(response.data.about ?? "");
                setWorkInput(response.data.work ?? "");
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
        return api.get(`/users/${authentication?.user?.id}`, {
            headers: {
                Authorization: `Bearer ${authentication.token}`
            }
        })
    }

    /**
     * Handles
     */
    function handleSubmit() {
        setAboutInputErrors([]);
        setWorkInputErrors([]);

        if (aboutInput.length > 255) {
            setAboutInputErrors(["você não pode exceder o limite de 255 caracteres!"]);
        }

        if (workInput.length > 255) {
            setWorkInputErrors(["você não pode exceder o limite de 255 caracteres!"]);
        }

        if (aboutInput.length <= 255 && workInput.length <= 255) {
            setLoadingSave(true);
            api.put(`/users`, {
                about: aboutInput.length == 0 ? null : aboutInput,
                work: workInput.length == 0 ? null : workInput
            }, {
                headers: {
                    Authorization: `Bearer ${authentication.token}`
                }
            })
                .then(() => {
                    Alert.alert("", "Informações salvas com sucesso!");
                })
                .catch(() => {
                    Alert.alert("", "Não foi possível atualizar seus dados, tente novamente!");
                })
                .finally(() => setLoadingSave(false));
        }
    }

    return (
        <View style={{ flex: 1 }}>
            <View style={{ padding: 20, flexDirection: "row", justifyContent: "space-between", backgroundColor: theme.colors.background }}>
                <BackButtonNavigator />
                {
                    loadingSave ?
                        <ActivityIndicator />
                        :
                        <TouchableOpacity onPress={handleSubmit}>
                            <Text>Salvar</Text>
                        </TouchableOpacity>
                }
            </View>
            {
                loading ?
                    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                        <ActivityIndicator size={40} />
                    </View>
                    :
                    <ScrollabeContainer contentContainerStyle={{ padding: 20, paddingTop: 0 }}>
                        <Avatar />
                        <View style={{ flexDirection: "row" }}>
                            {
                                true ?
                                    <ActionButton>
                                        <Text>Adicionar foto de perfil</Text>
                                    </ActionButton>
                                    :
                                    <>
                                        <ActionButton style={{ marginRight: 5 }}>
                                            <Text>Alterar foto</Text>
                                        </ActionButton>
                                        <ActionButton style={{ marginLeft: 5, backgroundColor: '#D44638' }}>
                                            <Text>Remover foto</Text>
                                        </ActionButton>
                                    </>
                            }
                        </View>

                        <Caption style={{ marginTop: 30 }}>Conte um pouquinho sobre você</Caption>
                        <TextInput
                            multiline
                            numberOfLines={8}
                            textAlignVertical="top"
                            style={{ marginTop: 10 }}
                            value={aboutInput}
                            onChangeText={text => setAboutInput(text)}
                            errors={aboutInputErrors}
                        />
                        <Caption style={{ marginTop: 10 }}>Em que você trabalha?</Caption>
                        <TextInput
                            multiline
                            numberOfLines={8}
                            textAlignVertical="top"
                            style={{ marginTop: 10 }}
                            value={workInput}
                            onChangeText={text => setWorkInput(text)}
                            errors={workInputErrors}
                        />
                    </ScrollabeContainer>
            }
        </View>
    );
}

export default EditProfile;