import { Dimensions, ImageBackgroundProps, ImageProps } from 'react-native';
import styled from 'styled-components/native';

const loginBackground = require("assets/login-background.png");
const logo = require("assets/green-logo.png");

export const Container = styled.View`
    flex: 1;
    padding: 20px;
`;

export const ImageLogo = styled.Image.attrs({
    source: logo
}) <ImageProps>`
    margin: 0px auto;
    margin-top: 30px;
`;
