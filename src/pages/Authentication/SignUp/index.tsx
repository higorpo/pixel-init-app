import React, { useState, useEffect } from 'react';
import { View, Keyboard } from 'react-native';
import { Container } from '../Welcome/styles';
import { BackButtonNavigator, TextInput, Button } from '~/components';
import { ImageLogo } from './styles';
import { Caption, Title } from '~/components/Typography';
import { useNavigation } from '@react-navigation/native';

const SignUp: React.FC = () => {
    const navigation = useNavigation();

    /**
     * States
     */
    const [isLogoVisible, setIsLogoVisible] = useState<boolean>(true);

    const [fieldMail, setFieldMail] = useState<string>("");
    const [fieldMailErrors, setFieldMailErrors] = useState<string[]>([]);
    const [fieldTicketNumber, setFieldTicketNumber] = useState<string>("");
    const [fieldTicketNumberErrors, setFieldTicketNumberErrors] = useState<string[]>([]);
    const [fieldPassword, setFieldPassword] = useState<string>("");
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

    return (
        <Container>
            <View style={{ marginVertical: 20 }}>
                <BackButtonNavigator />
            </View>
            <View style={{ flex: 1 }}>
                {isLogoVisible && <ImageLogo />}

                <View style={{ marginTop: "auto", marginBottom: "auto" }}>
                    <Title style={{ marginBottom: 5 }}>Entre em sua conta</Title>
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
                        autoCapitalize="words"
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
                    style={{
                        marginTop: "auto"
                    }}
                    loading={false}
                    onPress={() => null}
                />
            </View>
        </Container>
    );
}

export default SignUp;