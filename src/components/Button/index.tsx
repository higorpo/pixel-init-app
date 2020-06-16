import React from 'react';
import { View, TouchableOpacityProps, ActivityIndicator } from 'react-native';
import { useTheme } from 'styled-components';

import { Button as ButtonStyle, Label } from './styles';

interface IButtonProps extends TouchableOpacityProps {
    label: string,
    color?: "primary" | "secondary",
    textColor?: string,
    loading?: boolean
}

const Button: React.FC<IButtonProps> = React.memo((props) => {
    const theme = useTheme();

    const {
        label,
        color = "primary",
        loading = false,
        textColor
    } = props;

    return (
        // @ts-ignore
        <ButtonStyle {...props} color={color}>
            <View>
                {
                    loading == true ?
                        <ActivityIndicator color={color == "primary" ? "white" : theme.colors.primary} />
                        :
                        <Label color={color} style={textColor ? { color: textColor } : null}>{label}</Label>
                }
            </View>
        </ButtonStyle>
    );
})

export default Button;