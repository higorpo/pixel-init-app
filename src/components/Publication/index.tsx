import React, { useMemo, useState } from 'react';
import { View, Alert } from 'react-native';
import { Container, Avatar, PostDetails, Author, CreatedAt, PostText, PostReactions, ReactionButton } from './styles';
import { Publication as IPublication } from '~/store/ducks/publications/types';
import { formatDistance } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Caption } from '../Typography';
import api from '~/services/api';
import { AuthenticationState } from '~/store/ducks/authentication/types';
import { useSelector } from 'react-redux';
import { ApplicationState } from '~/store';

interface IPublicationProps {
    data: IPublication
}

const Publication: React.FC<IPublicationProps> = (props) => {
    const authentication: AuthenticationState = useSelector((state: ApplicationState) => state.authentication);

    /**
     * State
     */
    const [isLiked, setIsLiked] = useState<boolean>(props.data.is_liked);
    const [likesCount, setLikesCount] = useState<number>(props.data.__meta__.likes_count);

    /**
     * Memo
     */
    const formatedDate = useMemo(() => {
        return formatDistance(new Date(props.data.created_at), new Date(), { locale: ptBR });
    }, [props])

    /**
     * Handles
     */
    function handleLike() {
        setIsLiked(true);
        setLikesCount(oldLikes => ++oldLikes);

        api.post(`/publications/${props.data.id}/likes`, null, {
            headers: {
                Authorization: `Bearer ${authentication.token}`
            }
        })
            .catch(() => {
                Alert.alert("Erro", "Não foi possível curtir esta publicação!")
                setIsLiked(false);
                setLikesCount(oldLikes => --oldLikes);
            })
    }

    function handleUnlike() {
        setIsLiked(false);
        setLikesCount(oldLikes => --oldLikes);

        api.delete(`/publications/${props.data.id}/likes`)
            .catch(() => {
                Alert.alert("Erro", "Não foi possível curtir esta publicação!")
                setIsLiked(true);
                setLikesCount(oldLikes => ++oldLikes);
            })
    }

    return (
        <Container>
            <PostDetails>
                <Avatar />
                <View>
                    <Author>
                        {props.data.author.first_name} {props.data.author.last_name}
                    </Author>
                    <CreatedAt>
                        {formatedDate}
                    </CreatedAt>
                </View>
            </PostDetails>
            <PostText>
                {props.data.text}
            </PostText>
            <PostReactions>
                <ReactionButton onPress={isLiked ? handleUnlike : handleLike}>
                    <MaterialCommunityIcons name={isLiked ? "heart" : "heart-outline"} size={24} color={isLiked ? "#F45656" : "white"} />
                </ReactionButton>
                <ReactionButton>
                    <MaterialCommunityIcons name="comment-outline" size={24} color="white" />
                </ReactionButton>
                <Caption style={{ marginLeft: "auto" }}>{likesCount} curtidas • {props.data.__meta__.comments_count} comentários</Caption>
            </PostReactions>
        </Container>
    );
}

export default Publication;