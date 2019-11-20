import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Image
} from 'react-native';

import { connect } from 'react-redux';
import Loading from '../components/Loading';

import api from '../config/api';
import {
    setInstitutionsData,
    setInstitutionsDetailData
} from '../actions/institutionsActions';
import {
    setTermSearch
} from '../actions/searchActions';
import SearchBar from '../components/SearchBar';
import InstitutionsCard from '../components/InstitutionsCard';
import { TouchableOpacity } from 'react-native-gesture-handler';

class SearchPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            institutions: [],
            search: false
        };
    }
    
    componentDidMount() {
        this.searchInstitutionsByUserLocale();
    }

    onChangeHandler(term) {
        this.props.dispatchTermSearch(term);
    }

    async searchTerm() {
        this.setState({isLoading: true});
        
        const { search } = this.props;
        await api
            .post('/institution/search-institutions', {
                search
            })
            .then(response => {
                let data = response.data.data;

                this.props.dispatchInstitutionsData(data);
                institutions = data.map(item => {
                    const { user } = item;
                    return (
                        <InstitutionsCard
                            user={user}
                            onPress={() => this.navigateToInstitutionDetails(user)}
                        />
                    );
                });

                this.setState({isLoading: false});
                this.setState({institutions});
                this.setState({search: true});
            })
            .catch(error => {
                this.setState({isLoading: false});
            });
    }

    navigateToInstitutionDetails(user) {
        this.props.dispatchInstitutionDetailData(user);
        this.props.navigation.navigate('InstitutionDetailsPage');
    }

    async searchInstitutionsByUserLocale() {
        this.setState({isLoading: true});

        const { city, state } = this.props.user;

        await api
            .post('/institution/find-by-locale', {
                city: city,
                state: state
            })
            .then(response => {
                let data = response.data.data;

                this.props.dispatchInstitutionsData(data);
                institutions = data.map(item => {
                    const { user } = item;
                    return (
                        <InstitutionsCard
                            user={user}
                            onPress={() => this.navigateToInstitutionDetails(user)}
                        />
                    );
                });

                this.setState({isLoading: false});
                this.setState({institutions});
                this.setState({search: false});
            })
            .catch(error => {
                this.setState({isLoading: false});
            });
    }

    clearResults() {
        this.searchInstitutionsByUserLocale();
    }

    render() {
        const { institutions, search } = this.state;
        const { city } = this.props.user;

        if (this.state.isLoading) {
            return (
                <View style={styles.container}>
                    <Loading />
                </View>
            )
        }

        return (
            <View style={styles.container}>
                <SearchBar
                    onChangeHandler={(term) => this.onChangeHandler(term)}
                    onSubmit={() => this.searchTerm()}
                    term={this.props.search.term}
                />
                <Text style={styles.search}> { search 
                            ? 'Resultados da pesquisa' 
                            : 'Instituições em ' + city
                        }
                </Text>
                {
                    search ? <TouchableOpacity
                                onPress={() => this.clearResults()}
                                style={styles.button}
                            >
                                <Text>Limpar resultados</Text>
                            </TouchableOpacity>
                    : null
                }
                <ScrollView>
                    { institutions ? institutions : null }
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    search: {
        alignSelf: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 20
    },
    input: {
        borderBottomColor: 'blue',
        borderBottomWidth: 1,
        width: 300
    },
    button: {
        marginHorizontal: 40,
        borderRadius: 10,
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        padding: 10,
    },
    image: {
        aspectRatio: 1,
        width: 100,
        height: 100,
        marginLeft: 15
    },
    fantasy: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 15
    },
    address: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 15
    },
    interest: {
        fontSize: 15
    }
});

const mapStateToProps = state => {
    const { user, institutions, search } = state;
    return { user, institutions, search };
}

export default connect(
    mapStateToProps,
    {
        dispatchInstitutionsData: setInstitutionsData,
        dispatchInstitutionDetailData: setInstitutionsDetailData,
        dispatchTermSearch: setTermSearch
    }
)(SearchPage);