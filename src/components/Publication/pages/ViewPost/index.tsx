import React, { useState, useEffect } from 'react';
import { View, StatusBar, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
import { useTheme } from 'styled-components';
import { FlatList } from 'react-native-gesture-handler';
import { useRoute } from '@react-navigation/native';
import { Publication as IPublicationProps } from '~/store/ducks/publications/types';
import { Container, BackButtonNavigator, Publication, TextInput } from '~/components';
import { Text, Caption } from '~/components/Typography';
import api from '~/services/api';
import { AuthenticationState } from '~/store/ducks/authentication/types';
import { useSelector } from 'react-redux';
import { ApplicationState } from '~/store';
import Comment, { Comment as IComment } from '~/components/Comment';

interface IViewPostParams {
    publication: IPublicationProps
}

const ViewPost: React.FC = () => {
    const theme = useTheme();
    const route = useRoute();
    const params = route.params as IViewPostParams;

    const publication = params.publication;

    /**
     * Store state
     */
    const authentication: AuthenticationState = useSelector((state: ApplicationState) => state.authentication);


    /**
     * State
     */
    const [loading, setLoading] = useState<boolean>(true);
    const [pagination, setPagination] = useState<{
        total: number,
        perPage: number,
        page: number,
        lastPage: number
    }>({ total: 0, perPage: 0, page: 0, lastPage: 0 });
    const [comments, setComments] = useState<IComment[]>([]);

    const [commentText, setCommentText] = useState<string>("");

    /**
     * Effects
     */
    useEffect(() => {
        setLoading(true);

        loadData(1)
            .then((response) => {
                const { total, perPage, page, lastPage } = response.data
                setPagination({ total, perPage, page, lastPage });
                setComments(response.data.data);
                console.log(response.data.data);
            })
            .finally(() => {
                setLoading(false);
            })
    }, [])

    /**
     * Functions
     */
    function loadData(page: number = 1) {
        return api.get(`/publications/${publication.id}/comments`, {
            headers: {
                Authorization: `Bearer ${authentication.token}`
            },
            params: {
                page
            }
        })
    }

    function onEndReached() {
        if (!loading) {
            // Faz o controle de paginação.
            const { lastPage, page } = pagination;

            const nextPage = page + 1;

            // Verifica se  não tem todas as publicações aqui
            if (nextPage <= lastPage) {
                loadData(nextPage)
                    .then((response) => {
                        console.log("carregando mais...")
                        const { total, perPage, page, lastPage } = response.data
                        setPagination({ total, perPage, page, lastPage });
                        setComments(oldState => [...oldState, ...response.data.data]);
                    })
                // .finally(() => {
                //     setLoading(false);
                // })
            }
        }
    }

    /**
     * Handles
     */
    function handleSendComment(text: string) {
        setCommentText("");

        if (text.trim().length > 0) {
            api.post(`/publications/${publication.id}/comments`, {
                text
            }, {
                headers: {
                    Authorization: `Bearer ${authentication.token}`
                }
            })
                .then((response) => {
                    Alert.alert("", "Comentário enviado!");
                    setComments(oldState => [response.data, ...oldState]);
                })
                .catch(() => {
                    Alert.alert("", "Não foi possível enviar seu comentário!")
                })
        }
    }

    return (
        <View style={{ flex: 1 }}>
            <StatusBar barStyle="light-content" backgroundColor={theme.colors.background} />
            <BackButtonNavigator style={{
                padding: 20,
                marginBottom: -40,
                backgroundColor: theme.colors.background,
                zIndex: 99999
            }} />
            <FlatList
                data={comments}
                keyExtractor={item => String(item.id)}
                renderItem={({ item }) => <Comment data={item} />}
                style={{
                    zIndex: -1
                }}
                contentContainerStyle={{
                    padding: 20
                }}
                ListHeaderComponent={() => (
                    <View>
                        <Publication
                            data={publication}
                            hideCommentsButton={true}
                            hideDeletePostButton={true}
                            style={{ marginTop: 30 }}
                        />

                        <Text>Comentários da publicação</Text>
                    </View>
                )}
                ListEmptyComponent={() => {
                    if (loading) {
                        return <ActivityIndicator size={30} style={{ marginTop: 30 }} />
                    } else return <Caption style={{ marginTop: 30, paddingHorizontal: 30, textAlign: "center" }}>Está publicação não possuí comentários, seja o primeiro a comentar!</Caption>
                }}
                onEndReached={onEndReached}
                onEndReachedThreshold={0.4}
            />
            <View style={{ padding: 20, paddingTop: 0 }}>
                <TextInput placeholder="Comentar..." value={commentText} onChangeText={text => setCommentText(text)} />
                <TouchableOpacity activeOpacity={.8} onPress={() => handleSendComment(commentText)}>
                    <Text style={{ marginLeft: "auto", marginTop: 20 }}>Comentar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default ViewPost;