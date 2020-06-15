import { Dimensions, ImageBackgroundProps, ImageProps } from 'react-native';
import styled from 'styled-components/native';

const loginBackground = require("assets/login-background.png");
const logo = require("assets/white-logo.png");

export const Container = styled.View`
    flex: 1;
    padding: 20px;
`;

export const ImageContainer = styled.ImageBackground.attrs({
    source: loginBackground,
}) <ImageBackgroundProps>`
    flex: 1;
    margin: -20px;
    width: ${Dimensions.get("window").width}px;
    margin-bottom: 40px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`;

export const ImageLogo = styled.Image.attrs({
    source: logo
}) <ImageProps>`
    
`;

export const Title = styled.Text`
    font-family: "Roboto_700Bold";
    font-size: 27px;
    color: ${props => props.theme.colors.grey6};
    margin-bottom: 23px;
`;