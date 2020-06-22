import React, { useState, useEffect } from 'react';
import { View, Keyboard, Alert } from 'react-native';
import { Container } from '../Welcome/styles';
import { BackButtonNavigator, TextInput, Button } from '~/components';
import { ImageLogo } from './styles';
import { Caption, Title } from '~/components/Typography';
import { useNavigation } from '@react-navigation/native';
import * as Yup from 'yup';
import User from '~/services/User';
import api from '~/services/api';
import Axios from 'axios';
import { useDispatch } from 'react-redux';
import AuthenticationActions from '~/store/ducks/authentication/actions';

const SignUp: React.FC = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();

    /**
     * States
     */
    const [isLogoVisible, setIsLogoVisible] = useState<boolean>(true);

    const [loading, setLoading] = useState<boolean>(false);

    const [fieldMail, setFieldMail] = useState<string>("higor.oliveira@ejpixel.com.br");
    const [fieldMailErrors, setFieldMailErrors] = useState<string[]>([]);
    const [fieldTicketNumber, setFieldTicketNumber] = useState<string>("RGJAURC5GQ");
    const [fieldTicketNumberErrors, setFieldTicketNumberErrors] = useState<string[]>([]);
    const [fieldPassword, setFieldPassword] = useState<string>("abc123");
    const [fieldPasswordErrors, setFieldPasswordErrors] = useState<string[]>([]);


    /**
     * Effects
     */
    useEffect(() => {
        const keyboardDidShow = Keyboard.addListener("keyboardDidShow", () => setIsLogoVisible(false));
        const keyboardDidHide = Keyboard.addListener("keyboardDidHide", () => setIsLogoVisible(true));

        return () => {
            keyboardDidShow.remove();
            keyboardDidHide.remove();
        }
    }, [])

    /**
     * Handles
     */
    async function handleSubmit() {
        setLoading(true);

        setFieldMailErrors([]);
        setFieldTicketNumberErrors([]);
        setFieldPasswordErrors([]);

        const schema = Yup.object().shape({
            mail: Yup.string().email("você precisa digitar um e-mail válido").required("e-mail é um campo obrigatório"),
            ticket_number: Yup.string().required("você precisa digitar o número do ingresso fornecido no Sympla").length(10, "o número do ingresso deve ter 10 caracteres"),
            password: Yup.string().required("senha é um campo obrigatório").min(5, "sua senha deve ter no mínimo 5 caracteres").max(15, "sua senha deve ter no máximo 15 caracteres")
        });

        try {
            await schema.validate({
                mail: fieldMail,
                ticket_number: fieldTicketNumber,
                password: fieldPassword
            }, {
                abortEarly: false
            });

            // Remove os traços do número do ingresso se houver
            const serializedTicketNumber = fieldTicketNumber.replace(/-/g, "");

            // Faz a chamada a API
            // const newUser = await User.createAccount(fieldMail, fieldPassword, serializedTicketNumber)

            // Criou a conta, faz a autenticação
            const login = await User.loginAttempt(fieldMail, fieldPassword);

            if (login.data.token) {
                dispatch(AuthenticationActions.setToken(login.data.token, login.data.user));
            }

        } catch (error) {
            if (error instanceof Yup.ValidationError) {
                error.inner.forEach(fieldError => {
                    switch (fieldError.path) {
                        case "mail":
                            setFieldMailErrors(oldState => [...oldState, fieldError.message])
                            break;
                        case "ticket_number":
                            setFieldTicketNumberErrors(oldState => [...oldState, fieldError.message])
                            break;
                        case "password":
                            setFieldPasswordErrors(oldState => [...oldState, fieldError.message])
                            break;
                    }
                })
            }

            if (error?.response?.data?.error == "TICKET_NUMBER_NOT_FOUND") {
                setFieldTicketNumberErrors(["O número do ingresso informado não corresponde a nenhum ingresso cadastrado na plataforma do Sympla. Verifique seus dados e tente novamente!"]);
            } else if (error?.response?.data?.error == "INCORRECT_EMAIL") {
                setFieldMailErrors(["E-mail usado na compra do ingresso no Sympla não corresponde ao e-mail digitado no aplicativo do Pixel Init, verifique seus dados e tente novamente!"]);
            } else if (error?.response?.data instanceof Array && error?.response?.status == 400 || error?.response?.status == 401) {
                const errors = error?.response?.data;
                errors.forEach((fieldError: any) => {
                    switch (fieldError.field) {
                        case "mail":
                            setFieldMailErrors(oldState => [...oldState, fieldError.message])
                            break;
                        case "ticket_number":
                            setFieldTicketNumberErrors(oldState => [...oldState, fieldError.message])
                            break;
                        case "password":
                            setFieldPasswordErrors(oldState => [...oldState, fieldError.message])
                            break;
                    }
                })
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <Container>
            <View style={{ marginVertical: 20 }}>
                <BackButtonNavigator />
            </View>
            <View style={{ flex: 1 }}>
                {isLogoVisible && <ImageLogo />}

                <View style={{ marginTop: "auto", marginBottom: "auto" }}>
                    <Title style={{ marginBottom: 5 }}>Crie uma conta</Title>
                    <Caption style={{ marginBottom: 20 }}>
                        Utilize suas informações de ingresso do
                        Sympla para criar uma conta no aplicativo do
                        Pixel Init!
                    </Caption>
                    <TextInput
                        placeholder="E-mail usado no Sympla"
                        value={fieldMail}
                        onChangeText={text => setFieldMail(text)}
                        containerStyle={{ marginBottom: 10 }}
                        errors={fieldMailErrors}
                        onFieldErrorsChange={() => setFieldMailErrors([])}
                        autoCapitalize="none"
                        autoFocus={false}
                        autoCorrect={true}
                        autoCompleteType="email"
                    />
                    <TextInput
                        placeholder="Número do ingresso do Sympla"
                        value={fieldTicketNumber}
                        onChangeText={text => setFieldTicketNumber(text)}
                        containerStyle={{ marginBottom: 10 }}
                        errors={fieldTicketNumberErrors}
                        onFieldErrorsChange={() => setFieldTicketNumberErrors([])}
                        autoCapitalize="characters"
                        autoFocus={false}
                        autoCorrect={false}
                        autoCompleteType="off"
                    />
                    <TextInput
                        placeholder="Nova senha"
                        value={fieldPassword}
                        onChangeText={text => setFieldPassword(text)}
                        containerStyle={{ marginBottom: 10 }}
                        errors={fieldPasswordErrors}
                        onFieldErrorsChange={() => setFieldPasswordErrors([])}
                        autoCapitalize="none"
                        autoFocus={false}
                        autoCorrect={false}
                        autoCompleteType="password"
                        secureTextEntry={true}
                    />
                    <Caption>
                        Esta é a senha que você usará para entrar no
                        aplicativo do Pixel Init.
                    </Caption>

                </View>

                <Button
                    label="vamos lá"
                    color="secondary"
                    loading={loading}
                    style={{
                        marginTop: "auto"
                    }}
                    onPress={handleSubmit}
                />
            </View>
        </Container>
    );
}

export default SignUp;