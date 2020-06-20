import React from 'react';
import { Header } from '../Home/styles';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { View, Platform, Alert, RefreshControl, ActivityIndicator } from 'react-native';
import { Title, Text, Caption } from '~/components/Typography';
import Constants from 'expo-constants';
import { BackButtonNavigator, ScrollabeContainer, Container } from '~/components';

const Notifications: React.FC = () => {
    return (
        <View style={{ flex: 1 }}>
            <Header style={{ paddingTop: Platform.OS == "ios" ? Constants.statusBarHeight + 20 : 20, paddingBottom: 20 }}>
                <BackButtonNavigator color="white" />
                <Title style={{ marginTop: 10, marginBottom: 0 }} size={30}>Notificações</Title>
            </Header>
            <ScrollabeContainer>
                <Container>

                </Container>
            </ScrollabeContainer>
        </View>
    );
}

export default Notifications;