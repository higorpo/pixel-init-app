import { Dimensions, ImageBackgroundProps, ImageProps } from 'react-native';
import styled from 'styled-components/native';

const loginBackground = require("assets/login-background.png");
const logo = require("assets/green-logo.png");

export const ImageLogo = styled.Image.attrs({
    source: logo
}) <ImageProps>`
    margin: 0px auto;
    margin-top: auto;
`;
