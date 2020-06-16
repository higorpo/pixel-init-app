import styled from 'styled-components/native';

const logo = require("assets/logo.png")
const userProfile = require("assets/user-profile.png")

export const Header = styled.View`
    padding: 20px 20px;
    padding-bottom: 5px;
    background-color: ${props => props.theme.colors.primary};
`;

export const LogoImage = styled.Image.attrs({
    source: logo
})`
  
`;

export const ProfileImage = styled.Image.attrs({
    source: userProfile
})`
    width: 40px;
    height: 40px;
    border-radius: 100px;
    border: 2px solid;
    border-color: ${props => props.theme.colors.primary};
`;

export const UserName = styled.Text`
    background-color: ${props => props.theme.colors.grey6};
    padding: 5px 20px;
    border-top-left-radius: 100px;
    border-bottom-left-radius: 100px;
    margin-right: -10px;
`;

interface ISpeechContainerProps {
    speechCategory: "academic" | "technician" | "market"
}

export const SpeechContainer = styled.TouchableOpacity.attrs({
    activeOpacity: .8
}) <ISpeechContainerProps>`
    background-color: rgba(0,0,0,.35);
    border-bottom-width: 5px;
    border-bottom-color: ${props => props.speechCategory == "academic" ? "#B04462" : props.speechCategory == "technician" ? "#2D9CDB" : "#9B51E0"};
    margin-top: 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 15px 15px;
`;

export const SpeechTime = styled.Text`
    color: white;
    font-size: 30px;
    font-family: "Roboto_400Regular";
`;

export const SpeechName = styled.Text.attrs({
    numberOfLines: 1
})`
    color: white;
    font-family: "Roboto_400Regular";
    font-size: 18px;
    margin-bottom: -2px;
`;

export const SpeechPresenter = styled.Text.attrs({
    numberOfLines: 2
})`
    color: white;
    font-family: "Roboto_300Light";
`;