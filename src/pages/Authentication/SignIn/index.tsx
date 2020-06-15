import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View } from 'react-native';
import { Container, ImageLogo } from './styles';
import { BackButtonNavigator, Button } from '~/components';
import { Title } from '~/components/Typography';

const SignIn: React.FC = () => {
    const navigation = useNavigation();

    return (
        <Container>
            <View style={{ marginVertical: 20 }}>
                <BackButtonNavigator />
            </View>

            <View style={{ flex: 1 }}>
                <ImageLogo />

                <View style={{ marginTop: "auto", marginBottom: "auto" }}>
                    <Title>Entre em sua conta</Title>
                </View>

                <Button
                    label="entrar"
                    color="secondary"
                    style={{
                        marginTop: "auto"
                    }}
                />
            </View>
        </Container>
    );
}

export default SignIn;