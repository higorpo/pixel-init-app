import styled from 'styled-components/native';

const userProfile = require("assets/user-profile.png")

export const UserContainer = styled.View`
    flex-direction: row;
    align-items: center;
    margin-bottom: 10px;
`;

export const Avatar = styled.Image.attrs({
    source: userProfile
})`
    width: 40px;
    height: 40px;
    border-radius: 100px;
    margin-right: 10px;
`;
