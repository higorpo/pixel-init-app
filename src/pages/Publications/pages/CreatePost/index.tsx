import React, { useState } from 'react';
import { View, StatusBar, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { useTheme } from 'styled-components';
import { BackButtonNavigator, Container, TextInput } from '~/components';
import { Title, Caption, Text } from '~/components/Typography';
import api from '~/services/api';
import { useNavigation } from '@react-navigation/native';
import { AuthenticationState } from '~/store/ducks/authentication/types';
import { useSelector, useDispatch } from 'react-redux';
import { ApplicationState } from '~/store';
import PublicationsActions from '~/store/ducks/publications/actions';

const CreatePost: React.FC = () => {
    const theme = useTheme();
    const navigation = useNavigation();
    const dispatch = useDispatch();

    /**
     * Store state
     */
    const authentication: AuthenticationState = useSelector((state: ApplicationState) => state.authentication);


    /**
     * State
     */
    const [loading, setLoading] = useState<boolean>(false);
    const [textInput, setTextInput] = useState<string>("");
    const [textInputErrors, setTextInputErrors] = useState<string[]>([]);

    /**
     * Handles
     */
    function handleSubmit() {
        setTextInputErrors([]);

        if (textInput.trim().length == 0) return;

        if (textInput.trim().length > 255) {
            setTextInputErrors(["O tamanho da sua publicação não pode exceder 255 caracteres!"]);
        }

        setLoading(true);

        api.post(`/publications`, {
            text: textInput
        }, {
            headers: {
                Authorization: `Bearer ${authentication.token}`
            }
        })
            .then((response) => {
                Alert.alert("", "Publicação criada!");
                dispatch(PublicationsActions.refresh());
                navigation.goBack();
            })
            .catch(() => {
                Alert.alert("", "Não foi possível criar sua publicação!")
            })
            .finally(() => {
                setLoading(false);
            })
    }

    return (
        <Container>
            <StatusBar barStyle="light-content" backgroundColor={theme.colors.background} />
            <BackButtonNavigator />
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                <Title style={{ marginTop: 10 }}>Criar publicação</Title>
                {
                    loading ?
                        <ActivityIndicator />
                        :
                        <TouchableOpacity onPress={handleSubmit}>
                            <Text style={{ color: theme.colors.primary }}>Criar</Text>
                        </TouchableOpacity>
                }
            </View>

            <TextInput
                placeholder="Conteúdo da publicação"
                multiline
                textAlignVertical="top"
                numberOfLines={12}
                autoCapitalize="sentences"
                autoCorrect={true}
                errors={textInputErrors}
                value={textInput}
                onChangeText={text => setTextInput(text)}
            />
            <Caption style={{ marginLeft: "auto", marginTop: 10 }}>255 caracteres</Caption>
        </Container>
    );
}

export default CreatePost;