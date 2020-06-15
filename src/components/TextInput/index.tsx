import React from 'react';
import { View, TextInputProps, StyleProp, ViewStyle, NativeSyntheticEvent, TextInputFocusEventData } from 'react-native';
import { TextInputWrapper, FieldError } from './styles';

interface ITextInputProps extends TextInputProps {
    /**
     * Field errors
     */
    errors?: string[] | undefined,
    onFieldErrorsChange?: () => void
    containerStyle?: StyleProp<ViewStyle>,
}

const TextInput: React.FC<ITextInputProps> = (props) => {

    function handleOnFocus(event: NativeSyntheticEvent<TextInputFocusEventData>) {
        if (props.onFocus) {
            props.onFocus(event);
        }

        if (props.onFieldErrorsChange) {
            props.onFieldErrorsChange();
        }
    }

    return (
        <View style={props.containerStyle}>
            {/* @ts-ignore */}
            <TextInputWrapper {...props} keyboardAppearance="dark" onFocus={handleOnFocus} />
            {
                props.errors && props.errors.map(error => <FieldError key={error}>{error}</FieldError>)
            }
        </View>
    );
}

export default TextInput;