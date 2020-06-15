import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Platform, StatusBar } from 'react-native';
import { Button } from '../../../components';
import { Container, ImageContainer, ImageLogo, Title } from './styles';

const Welcome: React.FC = () => {
    const navigation = useNavigation();

    return (
        <Container>
            {Platform.OS == "android" && <StatusBar translucent={true} backgroundColor="transparent" />}
            <ImageContainer
                resizeMethod="scale"
                resizeMode="cover"
            >
                <ImageLogo />
            </ImageContainer>
            <Title>
                Entre no aplicativo para ter acesso as informações do evento.
            </Title>
            <Button
                label="entrar"
                onPress={() => navigation.navigate("SignIn")}
            />
            <Button
                label="registrar-se"
                color="secondary"
                style={{
                    marginTop: 10
                }}
                onPress={() => navigation.navigate("SignUp")}
            />
        </Container>
    );
}

export default Welcome;