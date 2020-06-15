import styled from 'styled-components/native';

interface IButtonProps {
    color: "primary" | "secondary"
}

export const Button = styled.TouchableOpacity.attrs({
    activeOpacity: .8
})<IButtonProps>(props => `
    background-color: ${props.color == "primary" ? props.theme.colors.primary : "white"};
    height: 48px;
    border-radius: 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`);

interface ILabelProps {
    color: "primary" | "secondary"
}

export const Label = styled.Text<ILabelProps>`
    font-family: "Roboto_700Bold";
    font-style: normal;
    font-weight: bold;
    font-size: 22px;
    color: ${props => props.color == "primary" ? props.theme.colors.grey5 : props.theme.colors.primary};
`;
