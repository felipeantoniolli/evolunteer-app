import React from 'react';
import { connect } from 'react-redux';
import { setTermSearch } from '../actions/searchActions';
import { Text, TextInput, View, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

class SearchBar extends React.Component {
    onChangeHandler(term) {
        this.props.dispatchTermSearch(term);
    }

    searchTerm() {
        console.log("procurando");
    }

    render() {
        const { term } = this.props.search;

        return (
            <View style={styles.container}>
                <TextInput
                    onChangeText={term => this.onChangeHandler(term)}
                    value={term}
                    onSubmitEditing={() => this.searchTerm()}
                    style={styles.input}
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => this.searchTerm()}
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
        width: 300
    },
    button: {
        paddingVertical: 10,
        paddingHorizontal: 10,
        marginLeft: 10,
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