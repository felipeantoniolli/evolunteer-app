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
import { setInstitutionsData, setInstitutionsDetailData } from '../actions/institutionsActions';
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
                        <TouchableOpacity
                            style={styles.institutionButton}
                            key={user.id_user}
                            onPress={() => this.navigateToInstitutionDetails(user)}
                        >
                            <View style={styles.institutionView}>
                                <Image
                                    style={styles.image}
                                    source={require('../assets/no-image.png')}
                                />
                                <View style={{flexDirection: 'column'}}>
                                    <Text style={styles.fantasy}>{user.institution.fantasy}</Text>
                                    <Text style={styles.address}>{user.city} - {user.state}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    );
                });

                this.setState({isLoading: false});
                this.setState({institutions});
            })
            .catch(error => {
                this.setState({isLoading: false});
            });
    }

    render() {
        const { institutions, search } = this.state;

        if (this.state.isLoading) {
            return (
                <View style={styles.container}>
                    <Loading />
                </View>
            )
        }

        return (
            <View style={styles.container}>
                <Text style={styles.search}> { search 
                            ? 'Resultados da pesquisa' 
                            : 'Instituições próximas de você!'
                        }
                </Text>
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
        marginTop: 20,
        borderRadius: 10,
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        padding: 10,
    },
    institutionView: {
        flexDirection: 'row',
        marginVertical: 10
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
    institutionButton: {
        backgroundColor: '#F2F9F8',
        marginVertical: 15
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
    const { user, institutions } = state;
    return { user, institutions };
}

export default connect(
    mapStateToProps,
    {
        dispatchInstitutionsData: setInstitutionsData,
        dispatchInstitutionDetailData: setInstitutionsDetailData
    }
)(SearchPage);