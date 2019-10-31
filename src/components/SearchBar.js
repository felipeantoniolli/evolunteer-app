import React from 'react';
import { connect } from 'react-redux';
import { setTermSearch } from '../actions/searchActions';
import { Text, TextInput, View, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import api from '../config/api';

class SearchBar extends React.Component {
    onChangeHandler(term) {
        this.props.dispatchTermSearch(term);
    }

    async searchTerm() {
        console.log(this.props.search);
        return;
        await api
            .post('/institution/search', {
                data: data
            })
            .then(response => {
                console.log(response.data.data)
            })
            .catch(error => {
                console.log(error);
            })
    }

    render() {
        const { term } = this.props.search;

        return (
            <View style={styles.container}>
                <TextInput
                    onChangeText={term => this.onChangeHandler(term)}
                    value={term}
                    onSubmitEditing={() => this.onChangeHandler()}
                    style={styles.input}
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => this.onChangeHandler()}
                >
                    <Text>Pesquisar</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingLeft: 10,
        marginTop: 30
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

const mapStateToProps = state => {
    const { search } = state;
    return { search };
}

export default connect(
    mapStateToProps,
    {
        dispatchTermSearch: setTermSearch
    }
)(SearchBar);   