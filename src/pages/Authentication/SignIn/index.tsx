import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { View, Keyboard } from 'react-native';
import * as Yup from 'yup';
import { ImageLogo } from './styles';
import { BackButtonNavigator, Button, TextInput, Container } from '~/components';
import { Title, Caption } from '~/components/Typography';
import User from '~/services/User';
import AuthenticationActions from '~/store/ducks/authentication/actions';
import { useDispatch } from 'react-redux';

const SignIn: React.FC = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();

    /**
     * States
     */
    const [isLogoVisible, setIsLogoVisible] = useState<boolean>(true);

    const [fieldMail, setFieldMail] = useState<string>("higor.oliveira@ejpixel.com.br");
    const [fieldMailErrors, setFieldMailErrors] = useState<string[]>([]);
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
        setFieldMailErrors([]);
        setFieldPasswordErrors([]);

        const schema = Yup.object().shape({
            mail: Yup.string().email("você precisa digitar um e-mail válido").required("e-mail é um campo obrigatório"),
            password: Yup.string().required("senha é um campo obrigatório").min(5, "sua senha deve ter no mínimo 5 caracteres").max(15, "sua senha deve ter no máximo 15 caracteres")
        });

        try {
            await schema.validate({
                mail: fieldMail,
                password: fieldPassword
            }, {
                abortEarly: false
            });

            const login = await User.loginAttempt(fieldMail, fieldPassword);

            if (login.data.token) {
                dispatch(AuthenticationActions.setToken(login.data.token, login.data.user_id));
            }
        } catch (error) {
            if (error instanceof Yup.ValidationError) {
                error.inner.forEach(fieldError => {
                    switch (fieldError.path) {
                        case "mail":
                            setFieldMailErrors(oldState => [...oldState, fieldError.message])
                            break;
                        case "password":
                            setFieldPasswordErrors(oldState => [...oldState, fieldError.message])
                            break;
                    }
                })
            } else if (error?.response?.data instanceof Array && error?.response?.status == 400 || error?.response?.status == 401) {
                const errors = error?.response?.data;
                errors.forEach((fieldError: any) => {
                    switch (fieldError.field) {
                        case "mail":
                            setFieldMailErrors(oldState => [...oldState, fieldError.message])
                            break;
                        case "password":
                            setFieldPasswordErrors(oldState => [...oldState, fieldError.message])
                            break;
                    }
                })
            }
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
                    <Title>Entre em sua conta</Title>
                    <TextInput
                        placeholder="Digite seu e-mail"
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
                        placeholder="Digite sua senha"
                        value={fieldPassword}
                        onChangeText={text => setFieldPassword(text)}
                        errors={fieldPasswordErrors}
                        onFieldErrorsChange={() => setFieldPasswordErrors([])}
                        autoCapitalize="none"
                        autoFocus={false}
                        autoCorrect={false}
                        autoCompleteType="password"
                        secureTextEntry={true}
                    />
                    <Caption
                        style={{
                            marginLeft: "auto",
                            marginTop: 5
                        }}
                        onPress={() => navigation.navigate("RecoverPass")}
                    >
                        Esqueceu sua senha?
                    </Caption>
                </View>

                <Button
                    label="entrar"
                    color="secondary"
                    style={{
                        marginTop: "auto"
                    }}
                    onPress={handleSubmit}
                />
            </View>
        </Container>
    );
}

export default SignIn;