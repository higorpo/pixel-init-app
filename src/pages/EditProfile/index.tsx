import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { BackButtonNavigator, ScrollabeContainer, TextInput } from '~/components';
import { useTheme } from 'styled-components';

import { Avatar, ActionButton } from './styles';
import { Text } from '~/components/Typography';

const EditProfile: React.FC = () => {
    const theme = useTheme();

    return (
        <View style={{ flex: 1 }}>
            <View style={{ padding: 20, flexDirection: "row", justifyContent: "space-between", backgroundColor: theme.colors.background }}>
                <BackButtonNavigator />
                <TouchableOpacity>
                    <Text>Salvar</Text>
                </TouchableOpacity>
            </View>
            <ScrollabeContainer contentContainerStyle={{ padding: 20, paddingTop: 0 }}>
                <Avatar />
                <View style={{ flexDirection: "row" }}>
                    {
                        true ?
                            <ActionButton>
                                <Text>Adicionar foto de perfil</Text>
                            </ActionButton>
                            :
                            <>
                                <ActionButton style={{ marginRight: 5 }}>
                                    <Text>Alterar foto</Text>
                                </ActionButton>
                                <ActionButton style={{ marginLeft: 5, backgroundColor: '#D44638' }}>
                                    <Text>Remover foto</Text>
                                </ActionButton>
                            </>
                    }
                </View>

                <TextInput
                    placeholder="Conte um pouquinho sobre você"
                    multiline
                    numberOfLines={8}
                    textAlignVertical="top"
                    style={{ marginTop: 10 }}
                />
                <TextInput
                    placeholder="Em que você trabalha?"
                    multiline
                    numberOfLines={8}
                    textAlignVertical="top"
                    style={{ marginTop: 10 }}
                />
            </ScrollabeContainer>
        </View>
    );
}

export default EditProfile;