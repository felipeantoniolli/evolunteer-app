import React from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet
} from 'react-native';

const Input = ({
        title,
        onChangeTextHandler,
        inputValue,
        passwordField = false,
        onSubmit = null,
        returnKey = "next",
        reference = null
    }) => (
    <View style={styles.content}>
         <View>
            <Text>{title}</Text>
        </View>
        <View style={styles.content}>
            <TextInput
                style={styles.input}
                onChangeText={onChangeTextHandler}
                value={inputValue}
                secureTextEntry={passwordField ? true : false}
                ref={reference}
                onSubmitEditing={onSubmit}
                returnKeyType={returnKey}
            />
        </View>
    </View>
);

const styles = StyleSheet.create({
    content: {
        marginTop: 15,
        justifyContent: 'center',
        alignItems: 'center'
    },
    input: {
        borderBottomColor: 'blue',
        borderBottomWidth: 1,
        width: 300
    },
    title: {
        fontSize: 40,
        marginBottom: 20
    },
    field: {
        fontSize: 20
    }
});

export default Input;