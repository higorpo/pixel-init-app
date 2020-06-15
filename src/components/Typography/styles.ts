import { TextProps } from 'react-native';
import styled from 'styled-components/native';

interface ITitleProps extends TextProps {
    size?: number
}

export const Title = styled.Text<ITitleProps>(props => `
    font-family: "Roboto_700Bold";
    font-size: ${props.size != null ? props.size : 22}px;
    color: ${props.theme.colors.grey6};
    margin-bottom: 19px;
`);

export const Caption = styled.Text<ITitleProps>(props => `
    font-family: "Roboto_400Regular";
    font-size: ${props.size != null ? props.size : 15}px;
    color: ${props.theme.colors.grey3};
`);