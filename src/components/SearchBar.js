import React from 'react';
import { Text, TextInput, View, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

const SearchBar = ({term, onChangeHandler, onSubmit}) => {
    return(
        <View style={styles.container}>
            <TextInput
                onChangeText={onChangeHandler}
                value={term}
                onSubmitEditing={onSubmit}
                style={styles.input}
                placeholder={"Digite sua pesquisa..."}
                placeholderTextColor="#7E7E7E"
            />
            <TouchableOpacity
                style={styles.button}
                onPress={onSubmit}
            >
                <FontAwesomeIcon icon={faSearch} size={20} />
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
        flex: 6,
        borderColor: '#FFA02D',
        borderRadius: 8,
        borderWidth: 1,
        backgroundColor: '#F9FBFF',
        paddingLeft: 10,
        height: 40
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