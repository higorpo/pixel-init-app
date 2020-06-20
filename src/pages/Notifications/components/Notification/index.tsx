import React, { useMemo } from 'react';
import { View } from 'react-native';
import { Notification as NotificationData, NotificationsState } from '~/store/ducks/notifications/types';
import TextNotification from '../TextNotification';
import { NotificationContainer } from './styles';
import { useSelector } from 'react-redux';
import { ApplicationState } from '~/store';
import { Title, Caption } from '~/components/Typography';
import { isToday, isYesterday, differenceInDays, format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

interface INotificationProps {
    data: NotificationData,
    index: number
}

const Notification: React.FC<INotificationProps> = React.memo((props) => {
    /**
     * Store state
     */
    const notifications: NotificationsState = useSelector((state: ApplicationState) => state.notifications);

    const mustShowDayNotification = useMemo(() => {
        const aboveNotification = notifications.data[props.index - 1];

        if (aboveNotification) {
            if (new Date(aboveNotification.created_at).getDate() != new Date(props.data.created_at).getDate()) {
                // São dias diferentes
                return true;
            } else {
                return false;
            }
        } else return true;

    }, [props])

    const dataTitle = useMemo(() => {
        const date = new Date(props.data.created_at);

        if (isToday(date)) {
            return "Hoje";
        } else if (isYesterday(date)) {
            return "Ontem";
        } else if (differenceInDays(new Date(), date) <= 7) {
            return format(date, "cccc", { locale: ptBR });
        } else {
            return format(date, "cccc, dd/MM", { locale: ptBR });
        }
    }, [props])

    const dataTime = useMemo(() => {
        const date = new Date(props.data.created_at);

        return format(date, "HH:mm", { locale: ptBR });
    }, [props])

    return (
        <View>
            {mustShowDayNotification &&
                <Title style={{ marginBottom: 10, textTransform: "capitalize" }} size={30}>
                    {dataTitle}
                </Title>
            }
            <Caption style={{ marginBottom: 3 }}>{dataTime}</Caption>
            <NotificationContainer>
                {
                    props.data.type == "alert" ?
                        <TextNotification data={props.data} />
                        :
                        <View />
                }
            </NotificationContainer>
        </View>
    )
})

export default Notification;