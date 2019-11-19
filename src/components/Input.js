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
        reference = null,
        lines = 1
    }) => (
    <View style={styles.content}>
         <View>
            <Text>{title}</Text>
        </View>
        <View style={styles.content}>
            <TextInput
                style={[styles.input, lines > 1 ? styles.multilines : null]}
                onChangeText={onChangeTextHandler}
                value={inputValue}
                secureTextEntry={passwordField ? true : false}
                ref={reference}
                onSubmitEditing={onSubmit}
                returnKeyType={returnKey}
                multiline={lines ? true : false}
                numberOfLines={lines}
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
    multilines: {
        borderWidth: 1,
        borderColor: 'blue',
        padding: 10
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