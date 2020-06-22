import React, { useMemo, useState } from 'react';
import { View, TouchableOpacity, Alert } from 'react-native';
import { Container, CommentDetails, Author, Avatar, CreatedAt, CommentText } from './styles';
import { formatDistance } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { AuthenticationState } from '~/store/ducks/authentication/types';
import { useSelector } from 'react-redux';
import { ApplicationState } from '~/store';
import { Text } from '../Typography';
import api from '~/services/api';

export interface Comment {
    id: number,
    user_id: number,
    publication_id: number,
    text: string,
    created_at: Date,
    updated_at: Date,
    author: {
        id: number,
        first_name: string,
        last_name: string,
        avatar: string | null
    }
}

interface ICommentProps {
    data: Comment
}

const Comment: React.FC<ICommentProps> = (props) => {
    /**
     * Store state
     */
    const authentication: AuthenticationState = useSelector((state: ApplicationState) => state.authentication);

    /**
     * State
     */
    const [commentDeleted, setCommentDeleted] = useState<boolean>(false);

    /**
    * Memo
    */
    const formatedDate = useMemo(() => {
        return formatDistance(new Date(props.data.created_at), new Date(), { locale: ptBR });
    }, [props])

    /**
     * Handles
     */
    function handleDeletePost() {
        Alert.alert("Deletar publicação", "Tem certeza que deseja deletar está publicação?", [
            {
                text: "Não",
                onPress: () => null,
                style: "cancel"
            },
            {
                text: "Sim",
                onPress: () => {
                    api.delete(`/publications/${props.data.publication_id}/comments/${props.data.id}`, {
                        headers: {
                            Authorization: `Bearer ${authentication.token}`
                        }
                    })
                        .then(() => {
                            Alert.alert("", "Comentário deletado com sucesso!")
                            setCommentDeleted(true);
                        })
                        .catch((error) => {
                            if (error.response.status == 403) {
                                Alert.alert("", "Você não tem permissão para deletar este comentário!");
                            } else {
                                Alert.alert("", "Não foi possível deletar o comentário, tente novamente mais tarde!");
                            }
                        })
                }
            }
        ])
    }

    if (commentDeleted) {
        return <View />
    }

    return (
        <Container>
            <Avatar />
            <View style={{ flex: 1 }}>
                <CommentDetails>
                    <Author>
                        {props.data.author.first_name} {props.data.author.last_name}
                    </Author>
                    <CreatedAt>{formatedDate}</CreatedAt>
                    {
                        (authentication.user?.id == props.data?.author?.id || authentication.user?.is_admin == true) &&
                        <TouchableOpacity activeOpacity={0.8} onPress={handleDeletePost}>
                            <Text style={{ marginLeft: 20, color: "#F45656" }}>Excluir</Text>
                        </TouchableOpacity>
                    }
                </CommentDetails>
                <CommentText>{props.data.text}</CommentText>
            </View>
        </Container>
    );
}

export default Comment;