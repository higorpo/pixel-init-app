import React, { useState } from 'react';
import { View, Alert, TouchableOpacity } from 'react-native';
import { Notification } from '~/store/ducks/notifications/types';
import { Text } from '~/components/Typography';
import { Avatar, ActionButton } from './styles';
import { useTheme } from 'styled-components';
import api from '~/services/api';
import { AuthenticationState } from '~/store/ducks/authentication/types';
import { useSelector } from 'react-redux';
import { ApplicationState } from '~/store';
import { useNavigation } from '@react-navigation/native';

const userProfile = require("assets/user-profile.png")

interface ConnectionRequestProps {
    data: Notification
}

const ConnectionRequest: React.FC<ConnectionRequestProps> = (props) => {
    const theme = useTheme();
    const navigation = useNavigation();

    /**
     * Store state
     */
    const authentication: AuthenticationState = useSelector((state: ApplicationState) => state.authentication);

    /**
     * State
     */
    const [interacted, setInteracted] = useState<boolean>(false);

    /**
     * Handles
     */
    function acceptRequest() {
        api.put(`/users/${props.data.connection_request_user_id}/connections/${props.data.connection_request_user_id}`, null, {
            headers: {
                Authorization: `Bearer ${authentication.token}`
            }
        })
            .then(() => {
                setInteracted(true);
            })
            .catch(() => {
                Alert.alert("", "Parece que estamos enfrentando um problema técnico, tente novamente mais tarde!")
            })
    }

    function refuseRequest() {
        api.delete(`/users/${props.data.connection_request_user_id}/connections/${props.data.connection_request_user_id}`, {
            headers: {
                Authorization: `Bearer ${authentication.token}`
            }
        })
            .then(() => {
                setInteracted(true);
            })
            .catch(() => {
                Alert.alert("", "Parece que estamos enfrentando um problema técnico, tente novamente mais tarde!")
            })
    }

    function handleOpenUser() {
        navigation.navigate("User", { id: props.data.connection_request_user_id });
    }

    return (
        <TouchableOpacity activeOpacity={.8} onPress={handleOpenUser} style={{ flexDirection: "row" }}>
            <Avatar source={props.data.connection_requested_by_user.avatar ? { uri: `http://54.197.125.89:3333/uploads/${props.data.connection_requested_by_user.avatar}` } : userProfile} />
            <View style={{ flex: 1 }}>
                <Text>{props.data?.connection_requested_by_user.first_name} {props.data?.connection_requested_by_user.last_name} pediu para conectar-se com você! Aceite para aumentar seu networking no Pixel Init!</Text>
                {
                    !interacted &&
                    <View style={{ flexDirection: "row" }}>
                        <ActionButton onPress={acceptRequest}>
                            <Text>aceitar</Text>
                        </ActionButton>
                        <ActionButton onPress={refuseRequest} style={{ marginLeft: 5, backgroundColor: theme.colors.grey6 }}>
                            <Text style={{ color: theme.colors.primary }}>recusar</Text>
                        </ActionButton>
                    </View>
                }
            </View>
        </TouchableOpacity>
    );
}

export default ConnectionRequest;