import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleProp, Text, View, ViewStyle, TouchableOpacity } from 'react-native';
import { useTheme } from 'styled-components';
import { useNavigation } from '@react-navigation/native';

interface IBackButtonNavigatorProps {
    style?: StyleProp<ViewStyle>,
}

const BackButtonNavigator: React.FC<IBackButtonNavigatorProps> = (props) => {
    const theme = useTheme();
    const navigation = useNavigation();

    return (
        <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={.7}>
            <View
                style={[{
                    flexDirection: "row",
                    alignItems: "center"
                }, props.style]}>
                <MaterialCommunityIcons name="arrow-left" size={24} color={theme.colors.primary} />
                <Text style={{
                    color: theme.colors.primary,
                    marginLeft: 5
                }}>Voltar</Text>
            </View>
        </TouchableOpacity>
    );
}

export default BackButtonNavigator;