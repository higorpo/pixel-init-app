import React from 'react';
import { View, TouchableOpacityProps } from 'react-native';

import { Button as ButtonStyle, Label } from './styles';

interface IButtonProps extends TouchableOpacityProps {
    label: string,
    color?: "primary" | "secondary"
}

const Button: React.FC<IButtonProps> = React.memo((props) => {
    const {
        label,
        color = "primary"
    } = props;

    return (
        // @ts-ignore
        <ButtonStyle color={color}>
            <View>
                <Label color={color}>{label}</Label>
            </View>
        </ButtonStyle>
    );
})

export default Button;