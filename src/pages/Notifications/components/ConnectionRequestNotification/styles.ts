import styled from 'styled-components/native';

export const Avatar = styled.Image`
    width: 60px;
    height: 60px;
    border-radius: 100px;
    margin-right: 10px;
`;

export const ActionButton = styled.TouchableOpacity.attrs({
    activeOpacity: .8
})`
    flex: 1;
    background-color: ${props => props.theme.colors.primary};
    align-items: center;
    justify-content: center;
    height: 40px;
    margin-top: 15px;
`;