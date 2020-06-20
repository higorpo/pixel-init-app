import React, { useEffect } from 'react';
import { Header } from '../Home/styles';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { View, Platform, Alert, RefreshControl, ActivityIndicator, FlatList } from 'react-native';
import { Title, Text, Caption } from '~/components/Typography';
import Constants from 'expo-constants';
import { BackButtonNavigator, ScrollabeContainer, Container } from '~/components';
import { Notification as NotificationData, NotificationsState } from '~/store/ducks/notifications/types';
import { useSelector, useDispatch } from 'react-redux';
import { ApplicationState } from '~/store';
import NotificationsActions from '~/store/ducks/notifications/actions';
import TextNotification from './components/TextNotification';
import Notification from './components/Notification';

const Notifications: React.FC = () => {
    const dispatch = useDispatch();

    /**
     * Store state
     */
    const notifications: NotificationsState = useSelector((state: ApplicationState) => state.notifications);


    /**
     * Effect
     */
    useEffect(() => {
        if (notifications.data.length == 0) {
            dispatch(NotificationsActions.request());
        }
    }, [])

    /**
     * Functions
     */
    function onRefresh() {
        dispatch(NotificationsActions.refresh());
    }

    function onEndReached() {
        if (!notifications.loading) {
            // Faz o controle de paginação.
            const { lastPage, page } = notifications;

            const nextPage = page + 1;

            // Verifica se  não tem todas as publicações aqui
            if (nextPage <= lastPage) {
                dispatch(NotificationsActions.request(nextPage))
            }
        }
    }

    return (
        <View style={{ flex: 1 }}>
            <Header style={{ paddingTop: Platform.OS == "ios" ? Constants.statusBarHeight + 20 : 20, paddingBottom: 20 }}>
                <BackButtonNavigator color="white" />
                <Title style={{ marginTop: 10, marginBottom: 0 }} size={30}>Notificações</Title>
            </Header>
            <View style={{ flex: 1 }}>
                {
                    notifications.loading ?
                        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                            <ActivityIndicator size={50} />
                        </View>
                        :
                        <FlatList
                            data={notifications.data}
                            keyExtractor={item => String(item.id)}
                            contentContainerStyle={{
                                padding: 20
                            }}
                            renderItem={({ item, index }) => (
                                <Notification data={item} index={index} />
                            )}
                            refreshControl={
                                <RefreshControl
                                    refreshing={notifications.refreshing}
                                    onRefresh={onRefresh}
                                />
                            }
                            onEndReached={onEndReached}
                            onEndReachedThreshold={0.4}
                            ListEmptyComponent={() => (
                                <View style={{
                                    flex: 1,
                                    justifyContent: "center",
                                    alignItems: "center"
                                }}>
                                    <Caption>Você ainda não possuí nenhuma notificação!</Caption>
                                </View>
                            )}
                            ListFooterComponent={() => {
                                if (!notifications.loading_more) return <View style={{ marginBottom: 10 }} />;

                                return (
                                    <ActivityIndicator style={{ marginVertical: 10 }} />
                                )
                            }}
                        />
                }
            </View>
        </View>
    );
}

export default Notifications;