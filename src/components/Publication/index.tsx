import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { formatDistance } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import React, { useMemo, useState } from 'react';
import { Alert, View, ViewProps } from 'react-native';
import { useSelector } from 'react-redux';
import api from '~/services/api';
import { ApplicationState } from '~/store';
import { AuthenticationState } from '~/store/ducks/authentication/types';
import { Publication as IPublication } from '~/store/ducks/publications/types';
import { Caption } from '../Typography';
import { Author, Avatar, Container, CreatedAt, PostDetails, PostReactions, PostText, ReactionButton } from './styles';

interface IPublicationProps extends ViewProps {
    data: IPublication,
    hideCommentsButton?: boolean
}

const Publication: React.FC<IPublicationProps> = (props) => {
    const navigation = useNavigation();

    /**
     * Store state
     */
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

    function handleOpenPost() {
        navigation.navigate("ViewPost", { publication: props.data });
    }

    return (
        <Container onPress={handleOpenPost} {...props}>
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
                {!props.hideCommentsButton && <MaterialCommunityIcons name="comment-outline" size={24} color="white" />}
                <Caption style={{ marginLeft: "auto" }}>{likesCount} curtidas • {props.data.__meta__.comments_count} comentários</Caption>
            </PostReactions>
        </Container>
    );
}

export default Publication;