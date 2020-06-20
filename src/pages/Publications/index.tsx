import Constants from 'expo-constants';
import React, { useEffect } from 'react';
import { Platform, View, TouchableOpacity, FlatList, ActivityIndicator, RefreshControl } from 'react-native';
import { Title, Caption } from '~/components/Typography';
import { Header } from '../Home/styles';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { PublicationsState } from '~/store/ducks/publications/types';
import { ApplicationState } from '~/store';
import PublicationsActions from '~/store/ducks/publications/actions';
import { Publication } from '~/components';

const Publications: React.FC = () => {
    const dispatch = useDispatch();

    /**
     * Store state
     */
    const publications: PublicationsState = useSelector((state: ApplicationState) => state.publications);


    /**
     * Effect
     */
    useEffect(() => {
        dispatch(PublicationsActions.request());
    }, [])

    /**
     * Functions
     */
    function onRefresh() {
        dispatch(PublicationsActions.refresh());
    }

    function onEndReached() {
        if (!publications.loading) {
            // Faz o controle de paginação.
            const { lastPage, page } = publications;

            const nextPage = page + 1;

            // Verifica se  não tem todas as publicações aqui
            if (nextPage <= lastPage) {
                dispatch(PublicationsActions.request(nextPage))
            }
        }
    }


    return (
        <View style={{ flex: 1 }}>
            <Header style={{ paddingTop: Platform.OS == "ios" ? Constants.statusBarHeight + 20 : 20, paddingBottom: 20 }}>
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                    <Title style={{ marginBottom: 0 }} size={30}>Publicações</Title>
                    <TouchableOpacity>
                        <MaterialCommunityIcons name="comment-plus" color="white" size={30} />
                    </TouchableOpacity>
                </View>
            </Header>
            <View style={{ flex: 1 }}>
                {
                    publications.loading ?
                        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                            <ActivityIndicator size={50} />
                        </View>
                        :
                        <FlatList
                            data={publications.data}
                            keyExtractor={item => String(item.id)}
                            contentContainerStyle={{
                                padding: 20
                            }}
                            renderItem={({ item, index }) => (
                                <Publication data={item} />
                            )}
                            refreshControl={
                                <RefreshControl
                                    refreshing={publications.refreshing}
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
                                    <Caption>Não há publicações para exibir, seja o primeiro a criar uma!</Caption>
                                </View>
                            )}
                            ListFooterComponent={() => {
                                if (!publications.loading_more) return <View style={{ marginBottom: 10 }} />;

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

export default Publications;