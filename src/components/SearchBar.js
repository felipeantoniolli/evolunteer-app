import React from 'react';
import { Text, TextInput, View, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const SearchBar = ({term, onChangeHandler, onSubmit}) => {
    return(
        <View style={styles.container}>
            <TextInput
                onChangeText={onChangeHandler}
                value={term}
                onSubmitEditing={onSubmit}
                style={styles.input}
            />
            <TouchableOpacity
                style={styles.button}
                onPress={onSubmit}
            >
                <Text>Pesquisar</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingLeft: 10,
        marginTop: 10
    },
    input: {
        borderBottomColor: 'blue',
        borderBottomWidth: 1,
        flex: 4
    },
    button: {
        flex: 1,
        marginHorizontal: 10,
        paddingVertical: 17,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 17,
        borderRadius: 10,
        alignItems: 'center',
        backgroundColor: '#DDDDDD'
    }
});

export default SearchBar;