import React from 'react';
import { View } from 'react-native';
import { Notification } from '~/store/ducks/notifications/types';
import { Text } from '~/components/Typography';

interface ITextNotificationProps {
    data: Notification
}

const TextNotification: React.FC<ITextNotificationProps> = (props) => {
    return (
        <View>
            <Text>{props.data.text}</Text>
        </View>
    );
}

export default TextNotification;