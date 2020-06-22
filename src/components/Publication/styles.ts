import styled from 'styled-components/native';

const userProfile = require("assets/user-profile.png")

export const Container = styled.TouchableOpacity.attrs({
    activeOpacity: .6
})`
    background: #0D0D0E;
    margin-bottom: 10px;
    padding: 10px 20px;
`;

export const Avatar = styled.Image.attrs({
    source: userProfile
})`
    width: 40px;
    height: 40px;
    border-radius: 100px;
    margin-right: 10px;
`;

export const PostDetails = styled.View`
    flex-direction: row;
    align-items: center;
`;

export const Author = styled.Text.attrs({
    numberOfLines: 1
})`
    flex: 1;
    color: ${props => props.theme.colors.text};
    font-family: "Roboto_700Bold";
    font-size: 18px;
    margin-bottom: -1px;
`;

export const CreatedAt = styled.Text`
    color: ${props => props.theme.colors.grey3};
    font-family: "Roboto_400Regular";
`;

export const PostText = styled.Text`
    color: ${props => props.theme.colors.text};
    font-family: "Roboto_400Regular";
    margin-top: 10px;
`;

export const PostReactions = styled.View`
    flex-direction: row;
    align-items: center;
    margin-top: 20px;
`;

export const ReactionButton = styled.TouchableOpacity.attrs({
    activeOpacity: .7
})`
    margin-right: 20px;
`;