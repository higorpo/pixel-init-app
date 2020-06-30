import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Alert, ActivityIndicator, KeyboardAvoidingView, Platform } from 'react-native';
import { BackButtonNavigator, ScrollabeContainer, TextInput } from '~/components';
import { useTheme } from 'styled-components';
import { Avatar, ActionButton } from './styles';
import { Text, Caption } from '~/components/Typography';
import { AuthenticationState } from '~/store/ducks/authentication/types';
import { useSelector, useDispatch } from 'react-redux';
import { ApplicationState } from '~/store';
import api from '~/services/api';
import { useNavigation } from '@react-navigation/native';
import { IUser } from '~/pages/User';
import * as ImagePicker from 'expo-image-picker';
import AuthenticationActions from '~/store/ducks/authentication/actions';
import { SafeAreaView } from 'react-native-safe-area-context';

const userProfile = require("assets/user-profile.png")


const EditProfile: React.FC = () => {
    const theme = useTheme();
    const navigation = useNavigation();
    const dispatch = useDispatch();


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

    function openImageLibrary() {
        ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            allowsMultipleSelection: false,
            aspect: [1, 1],
            quality: 1,
            base64: true,
        }).then((pickerResult: any) => {
            if (pickerResult.height < 400 || pickerResult.width < 400) {
                Alert.alert("Imagem muito pequena", "Imagem é muito pequena! Mínimo: 400px de largura e altura");
                return;
            }

            if (!pickerResult.cancelled) {
                delete pickerResult.cancelled;

                const formData = new FormData();
                formData.append('profile_pic', {
                    // @ts-ignore
                    name: `${Date.now()}`,
                    uri: pickerResult.uri,
                    type: "image/jpg"
                });
                api.post(`/uploads`, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${authentication.token}`
                    }
                })
                    .then((response) => {
                        console.log(response);
                        // @ts-ignore
                        setData(oldState => {
                            return { ...oldState, avatar: response.data.uri };
                        })
                        dispatch(AuthenticationActions.setProfilePic(response.data.uri))
                    })
                    .catch((error) => {
                        console.log(error)
                        console.log(error.response);
                        Alert.alert("", "Não foi possível fazer o upload desta foto, tente novamente mais tarde!");
                    })
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

    async function handleAddProfilePicture() {
        const permission = await ImagePicker.getCameraRollPermissionsAsync()

        if (permission.granted) {
            openImageLibrary();
        } else {
            // Não tem a permissão necessária
            const permission = await ImagePicker.requestCameraRollPermissionsAsync();
            if (permission.granted) {
                openImageLibrary();
            } else {
                Alert.alert("Permissões", "Precisamos da permissão para abrir sua galeria para poder prosseguir!", [
                    {
                        text: "Ok",
                        onPress: () => handleAddProfilePicture()
                    }
                ])
            }
        }
    }

    function handleRemoveProfilePicture() {
        Alert.alert("", "Deseja realmente remover sua foto de perfil?", [
            {
                text: "Não",
                onPress: () => null,
                style: "cancel"
            },
            {
                text: "Sim",
                onPress: () => {
                    api.delete(`/uploads`, {
                        headers: {
                            Authorization: `Bearer ${authentication.token}`
                        }
                    })
                        .then(() => {
                            // @ts-ignore
                            setData(oldState => {
                                return { ...oldState, avatar: null };
                            })
                            dispatch(AuthenticationActions.setProfilePic(null))
                        })
                        .catch((error) => {
                            console.log(error.response);
                            Alert.alert("", "Não foi possível remover a foto de perfil!");
                        })
                },
            }
        ])
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : undefined} style={{ flex: 1 }}>
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
                            <Avatar source={data?.avatar ? { uri: `http://54.197.125.89:3333/uploads/${data?.avatar}` } : userProfile} />
                            <View style={{ flexDirection: "row" }}>
                                {
                                    !data?.avatar ?
                                        <ActionButton onPress={handleAddProfilePicture}>
                                            <Text>Adicionar foto de perfil</Text>
                                        </ActionButton>
                                        :
                                        <>
                                            <ActionButton onPress={handleAddProfilePicture} style={{ marginRight: 5 }}>
                                                <Text>Alterar foto</Text>
                                            </ActionButton>
                                            <ActionButton onPress={handleRemoveProfilePicture} style={{ marginLeft: 5, backgroundColor: '#D44638' }}>
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
            </KeyboardAvoidingView>
        </SafeAreaView >
    );
}

export default EditProfile;