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
import InstitutionsCard from '../components/InstitutionsCard';
import { TouchableOpacity } from 'react-native-gesture-handler';

class SolicitationsVolunteerPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            institutions: [],
            solicitations: false,
            refresh: false
        };
    }
    
    componentDidMount() {
        this.searchInstitutionsByVolunteerId();
    }

    navigateToInstitutionDetails(user) {
        this.props.dispatchInstitutionDetailData(user);
        this.props.navigation.navigate('InstitutionDetailsPage', {volunteerPage: true});
    }

    async searchInstitutionsByVolunteerId() {
        this.setState({isLoading: true});

        const { id_volunteer } = this.props.user.volunteer;

        await api
            .post('/solicitation/find-by-volunteer', {
                'id_volunteer': id_volunteer
            })
            .then(response => {
                let data = response.data.data;

                this.props.dispatchInstitutionsData(data);
                institutions = data.map(item => {
                    const { user } = item;
                    return (
                        <InstitutionsCard
                            key={user.id_user}
                            user={user}
                            onPress={() => this.navigateToInstitutionDetails(user)}
                        />
                    );
                });

                this.setState({isLoading: false});
                this.setState({institutions});
                this.setState({solicitations: false});
            })
            .catch(error => {
                this.setState({isLoading: false});
            });
    }

    refreshPage() {
        this.props.navigation.state.params = null;
        this.setState({institutions: [], solicitations: false});
        this.searchInstitutionsByVolunteerId();
    }


    render() {
        const { institutions, solicitations } = this.state;
        const { city } = this.props.user;
        const { navigation } = this.props;

        if (navigation.getParam('refresh')) {
            var refresh = navigation.getParam('refresh');

            if (refresh) {
                this.refreshPage();
            }
        }

        if (this.state.isLoading) {
            return (
                <View style={styles.container}>
                    <Loading />
                </View>
            )
        }

        return (
            <View style={styles.container}>
                <Text style={styles.title}>
                    Minhas solicitações
                </Text>
               <TouchableOpacity
                    onPress={() => this.refreshPage()}
                    style={[styles.button]}
                >
                    <Text style={styles.textButton}>Recarregar Solicitações</Text>
                </TouchableOpacity>
                <ScrollView>
                    { institutions && institutions.length > 0
                        ? institutions
                        : <Text style={styles.notFound}>
                                Você não possui nenhuma solicitação no momento.
                          </Text>
                    }
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
    title: {
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
        marginTop: 10,
        borderRadius: 10,
        alignSelf: 'center',
        alignItems: 'center',
        backgroundColor: '#9EAFFF',
        padding: 10,
        width: 300,
        marginBottom: 10
    },
    textButton: {
        fontWeight: 'bold',
        fontSize: 15
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
    },
    notFound: {
        alignSelf: 'center',
        fontSize: 15,
        fontWeight: 'bold',
        marginVertical: 20
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
)(SolicitationsVolunteerPage);