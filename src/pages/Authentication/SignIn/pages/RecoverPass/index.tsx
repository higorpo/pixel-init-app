import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Keyboard, View, BackHandler } from 'react-native';
import * as Yup from 'yup';
import { BackButtonNavigator, Button, Container, TextInput } from '~/components';
import { Caption, Title } from '~/components/Typography';
import { ImageLogo } from '../../styles';

const RecoverPass: React.FC = () => {
    const navigation = useNavigation();

    /**
     * States
     */
    const [isLogoVisible, setIsLogoVisible] = useState<boolean>(true);
    const [recoverStep, setRecoverStep] = useState<"fill-mail" | "set-code-and-create-new-pass">("fill-mail");

    const [fieldMail, setFieldMail] = useState<string>("");
    const [fieldMailErrors, setFieldMailErrors] = useState<string[]>([]);
    const [fieldRecoverCode, setFieldRecoverCode] = useState<string>("");
    const [fieldRecoverCodeErrors, setFieldRecoverCodeErrors] = useState<string[]>([]);
    const [fieldNewPassword, setFieldNewPassword] = useState<string>("");
    const [fieldNewPasswordErrors, setFieldNewPasswordErrors] = useState<string[]>([]);
    const [fieldConfirmNewPassword, setFieldConfirmNewPassword] = useState<string>("");
    const [fieldConfirmNewPasswordErrors, setFieldConfirmNewPasswordErrors] = useState<string[]>([]);

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

    useEffect(() => {
        const backHandler = BackHandler.addEventListener("hardwareBackPress", () => {
            if (recoverStep == "set-code-and-create-new-pass") {
                setRecoverStep("fill-mail");
                return true;
            } else return false;
        });

        return () => {
            backHandler.remove();
        }
    }, [recoverStep])

    /**
     * Handles
     */

    function handleNavigatorBack() {
        if (recoverStep == "set-code-and-create-new-pass") {
            setRecoverStep("fill-mail");
            return;
        }

        navigation.goBack();
    }

    async function handleSendMailCode() {
        setFieldMailErrors([]);

        const schema = Yup.object().shape({
            mail: Yup.string().email("você precisa digitar um e-mail válido").required("e-mail é um campo obrigatório"),
        });

        try {
            await schema.validate({
                mail: fieldMail,
            }, {
                abortEarly: false
            });

            setRecoverStep("set-code-and-create-new-pass");
        } catch (error) {
            if (error instanceof Yup.ValidationError) {
                error.inner.map(fieldError => {
                    switch (fieldError.path) {
                        case "mail":
                            setFieldMailErrors(oldState => [...oldState, fieldError.message])
                            break;
                    }
                })
            }
        }
    }

    async function handleChangePassword() {
        setFieldRecoverCodeErrors([]);
        setFieldNewPasswordErrors([]);
        setFieldConfirmNewPasswordErrors([]);

        const schema = Yup.object().shape({
            recover_code: Yup.string().required("você deve digitar o código que foi enviado ao seu e-mail").length(6, "o código deve ter 6 caracteres"),
            new_password: Yup.string().required("a senha é obrigatória").min(5, "sua senha deve ter no mínimo 5 caracteres").max(15, "sua senha deve ter no máximo 15 caracteres"),
            confirm_new_password: Yup.string().equals([fieldNewPassword], "as senhas digitadas não são iguais").required("você precisa confirmar sua nova senha")
        });

        try {
            await schema.validate({
                recover_code: fieldRecoverCode,
                new_password: fieldNewPassword,
                confirm_new_password: fieldConfirmNewPassword,
            }, {
                abortEarly: false
            });

        } catch (error) {
            if (error instanceof Yup.ValidationError) {
                error.inner.map(fieldError => {
                    switch (fieldError.path) {
                        case "recover_code":
                            setFieldRecoverCodeErrors(oldState => [...oldState, fieldError.message])
                            break;
                        case "new_password":
                            setFieldNewPasswordErrors(oldState => [...oldState, fieldError.message])
                            break;
                        case "confirm_new_password":
                            setFieldConfirmNewPasswordErrors(oldState => [...oldState, fieldError.message])
                            break;
                    }
                })
            }
        }
    }

    return (
        <Container>
            <View style={{ marginVertical: 20 }}>
                <BackButtonNavigator onPress={handleNavigatorBack} />
            </View>

            <View style={{ flex: 1 }}>
                {isLogoVisible && <ImageLogo />}

                <View style={{ marginTop: "auto", marginBottom: "auto" }}>
                    <Title>Recupere sua conta</Title>
                    {
                        recoverStep == "fill-mail" &&
                        <View>
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

                            <Caption>
                                Digite o e-mail que você cadastrou sua conta
                                para receber o código de recuperação de
                                senha. O e-mail é o mesmo utilizado no
                                ingresso do Sympla!
                            </Caption>
                        </View>
                    }
                    {
                        recoverStep == "set-code-and-create-new-pass" &&
                        <View>
                            <TextInput
                                placeholder="Digite o código enviado ao e-mail"
                                value={fieldRecoverCode}
                                onChangeText={text => setFieldRecoverCode(text)}
                                containerStyle={{ marginBottom: 10 }}
                                errors={fieldRecoverCodeErrors}
                                onFieldErrorsChange={() => setFieldRecoverCodeErrors([])}
                                autoCapitalize="none"
                                autoFocus={false}
                                autoCorrect={false}
                                autoCompleteType="off"
                                keyboardType="numeric"
                                maxLength={6}
                            />

                            <Caption>
                                Digite o código que foi enviado ao seu e-mail
                                para recuperar senha senha!
                            </Caption>

                            <TextInput
                                placeholder="Nova senha"
                                value={fieldNewPassword}
                                onChangeText={text => setFieldNewPassword(text)}
                                containerStyle={{ marginTop: 10, marginBottom: 10 }}
                                errors={fieldNewPasswordErrors}
                                onFieldErrorsChange={() => setFieldNewPasswordErrors([])}
                                autoCapitalize="none"
                                autoFocus={false}
                                autoCorrect={false}
                                autoCompleteType="password"
                                secureTextEntry={true}
                            />
                            <TextInput
                                placeholder="Confirmar nova senha"
                                value={fieldConfirmNewPassword}
                                onChangeText={text => setFieldConfirmNewPassword(text)}
                                errors={fieldConfirmNewPasswordErrors}
                                onFieldErrorsChange={() => setFieldConfirmNewPasswordErrors([])}
                                autoCapitalize="none"
                                autoFocus={false}
                                autoCorrect={false}
                                autoCompleteType="password"
                                secureTextEntry={true}
                            />
                        </View>
                    }
                </View>

                {
                    recoverStep == "fill-mail" &&
                    <Button
                        label="enviar código"
                        color="secondary"
                        style={{
                            marginTop: "auto"
                        }}
                        onPress={handleSendMailCode}
                    />
                }
                {
                    recoverStep == "set-code-and-create-new-pass" &&
                    <Button
                        label="alterar senha"
                        color="secondary"
                        style={{
                            marginTop: "auto"
                        }}
                        onPress={handleChangePassword}
                    />
                }
            </View>
        </Container>
    );
}

export default RecoverPass;