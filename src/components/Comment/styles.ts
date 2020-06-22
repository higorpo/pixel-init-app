import styled from 'styled-components/native';

const userProfile = require("assets/user-profile.png")

export const Container = styled.View`
    flex-direction: row;
    align-items: center;
    margin-top: 10px;
`;

export const Avatar = styled.Image.attrs({
    source: userProfile
})`
    width: 30px;
    height: 30px;
    border-radius: 100px;
    margin-right: 10px;
`;

export const CommentDetails = styled.View`
    flex: 1;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
`;

export const Author = styled.Text.attrs({
    numberOfLines: 1
})`
    flex: 1;
    color: ${props => props.theme.colors.text};
    font-family: "Roboto_700Bold";
    font-size: 16px;
`;

export const CreatedAt = styled.Text`
    color: ${props => props.theme.colors.grey3};
    font-family: "Roboto_400Regular";
    margin-left: 5px;
`;

export const CommentText = styled.Text`
    color: ${props => props.theme.colors.text};
    font-family: "Roboto_400Regular";
`;
