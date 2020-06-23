import styled from 'styled-components/native';


export const UserContainer = styled.TouchableOpacity.attrs({
    activeOpacity: .8
})`
    flex-direction: row;
    align-items: center;
    margin-bottom: 10px;
`;

export const Avatar = styled.Image`
    width: 40px;
    height: 40px;
    border-radius: 100px;
    margin-right: 10px;
`;
