import styled from 'styled-components/native';

export const TextInputWrapper = styled.TextInput.attrs({
    placeholderTextColor: "#868687"
})`
    background-color: #0E0E10;
    padding: 10px 20px;
    color: white;
`;

export const FieldError = styled.Text`
    color: #FD5151;
    margin-top: 3px;
    font-size: 12px;
`;