import styled from 'styled-components/native';

const userProfile = require("assets/user-profile.png")

export const UserDetails = styled.View`
    flex-direction: row;
    align-items: center;
`;

export const Avatar = styled.Image.attrs({
    source: userProfile
})`
    width: 80px;
    height: 80px;
    border-radius: 10px;
    margin-right: 20px;
`;

export const ActionButton = styled.TouchableOpacity.attrs({
    activeOpacity: .8
})`
    background-color: ${props => props.theme.colors.primary};
    align-items: center;
    justify-content: center;
    height: 40px;
    margin-top: 15px;
`;