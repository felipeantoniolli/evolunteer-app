import React from 'react';
import { TextInputMask } from 'react-native-masked-text';
import {
    View,
    Text,
    TextInput,
    StyleSheet
} from 'react-native';

const MaskedInput = ({
    title,
    type,
    options = null,
    onChangeTextHandler,
    inputValue,
    passwordField = false,
    onSubmit = null,
    returnKey = "next",
    reference = null,
    lines = 0,
    error=null,
    keyboard= "default"
}) => {
    return (
        <View style={styles.content}>
            <View style={styles.content}>
                <TextInputMask
                    type={type}
                    options={options}
                    placeholder={title}
                    placeholderTextColor="#7E7E7E"
                    style={[styles.input, lines > 1 ? styles.multilines : null, error ? styles.error : null]}
                    onChangeText={onChangeTextHandler}
                    value={inputValue}
                    secureTextEntry={passwordField ? true : false}
                    ref={reference}
                    onSubmitEditing={onSubmit}
                    returnKeyType={returnKey}
                    multiline={lines ? true : false}
                    numberOfLines={lines ? lines : 1}
                    keyboardType={keyboard}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    content: {
        marginTop: 15,
        justifyContent: 'center',
        alignItems: 'center'
    },
    multilines: {
        borderWidth: 1,
        padding: 10,
        justifyContent: 'flex-start'
    },
    input: {
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#FFA02D',
        width: 300,
        height: 40,
        backgroundColor: '#F9FBFF',
        textAlign: 'center'
    },
    error: {
        borderColor: 'red',
        backgroundColor: '#FEE5E5'
    },
    title: {
        fontSize: 40,
        marginBottom: 20
    },
    field: {
        fontSize: 20
    },
    errorMessage: {
        fontSize: 10,
        alignSelf: 'center',
        color: 'red'
    }
});

export default MaskedInput;
