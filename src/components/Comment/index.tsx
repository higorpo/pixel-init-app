import React, { useMemo } from 'react';
import { View } from 'react-native';
import { Container, CommentDetails, Author, Avatar, CreatedAt, CommentText } from './styles';
import { formatDistance } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

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
    * Memo
    */
    const formatedDate = useMemo(() => {
        return formatDistance(new Date(props.data.created_at), new Date(), { locale: ptBR });
    }, [props])

    return (
        <Container>
            <Avatar />
            <View>
                <CommentDetails>
                    <Author>{props.data.author.first_name} {props.data.author.last_name}</Author>
                    <CreatedAt>{formatedDate}</CreatedAt>
                </CommentDetails>
                <CommentText>{props.data.text}</CommentText>
            </View>
        </Container>
    );
}

export default Comment;