import React from 'react';
import { View, ImageBackground, Dimensions, StatusBar, Platform } from 'react-native';
import { Button } from '../../../components';
import { Container, ImageContainer, ImageLogo, Title } from './styles';

const SignIn: React.FC = () => {
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
            />
            <Button
                label="registrar-se"
                color="secondary"
                style={{
                    marginTop: 10
                }}
            />
        </Container>
    );
}

export default SignIn;