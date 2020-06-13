import styled from 'styled-components/native';

interface IButton {
    color: "primary" | "secondary"
}

export const Button = styled.TouchableOpacity.attrs({
    activeOpacity: .8
})<IButton>(props => `
    background-color: ${props.color == "primary" ? props.theme.colors.primary : "white"};
    height: 48px;
    border-radius: 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`);

interface ILabel {
    color: "primary" | "secondary"
}

export const Label = styled.Text<ILabel>`
    font-family: "Roboto_700Bold";
    font-style: normal;
    font-weight: bold;
    font-size: 22px;
    color: ${props => props.color == "primary" ? props.theme.colors.grey5 : props.theme.colors.primary};
`;
