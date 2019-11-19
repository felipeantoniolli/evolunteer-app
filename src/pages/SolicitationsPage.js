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
import VolunteersCard from '../components/VolunteersCard';

import api from '../config/api';
import { setVolunteersData, setVolunteerDetailData } from '../actions/volunteersActions';

class SolicitationsPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            refresh: false,
            pendingSolicitations: [],
            approvedSolicitations: []
        };
    }

    componentDidMount() {
        this.findPendingSolicitations();
        this.findApprovedSolicitations();
    }

    navigateToVolunteerDetails(user) {
        this.props.dispatchVolunteerDetailData(user);
        this.props.navigation.navigate('VolunteerDetailsPage');
    }

    async findPendingSolicitations() {
        this.setState({isLoading: true});

        const { id_institution } = this.props.user.institution;

        await api
            .post('/volunteer/find-pending-solicitations', {
                id_institution: id_institution
            })
            .then(response => {
                let data = response.data.data;

                this.props.dispatchVolunteersData(data);
                const pendingSolicitations = data.map(item => {
                    const { user } = item;

                    return (
                        <VolunteersCard
                            user={user}
                            onPress={() => this.navigateToVolunteerDetails(user)}
                        />
                    );
                });

                this.setState({isLoading: false});
                this.setState({pendingSolicitations});
            })
            .catch(error => {
                console.log(error);
                this.setState({isLoading: false});
            });
    }

    async findApprovedSolicitations() {
        this.setState({isLoading: true});

        const { id_institution } = this.props.user.institution;

        await api
            .post('/volunteer/find-approved-solicitations', {
                id_institution: id_institution
            })
            .then(response => {
                let data = response.data.data;

                this.props.dispatchVolunteersData(data);
                const approvedSolicitations = data.map(item => {
                    const { user } = item;

                    return (
                        <VolunteersCard
                            user={user}
                            onPress={() => this.navigateToVolunteerDetails(user)}
                        />
                    );
                });

                this.setState({isLoading: false});
                this.setState({approvedSolicitations});
            })
            .catch(error => {
                console.log(error);
                this.setState({isLoading: false});
            });
    }

    refreshPage() {
        this.props.navigation.state.params = null;
        this.findPendingSolicitations();
        this.findApprovedSolicitations();
    }

    render() {
        const { pendingSolicitations, approvedSolicitations } = this.state;
        const { navigation } = this.props;
 
        if (this.state.isLoading) {
            return (
                <View style={styles.container}>
                    <Loading />
                </View>
            )
        }

        if (navigation.getParam('refresh')) {
            var refresh = navigation.getParam('refresh');

            if (refresh) {
                this.refreshPage();
            }
        }

        return (
            <ScrollView>
                <Text style={styles.title}>Solicitações pendentes</Text>
                {
                    pendingSolicitations 
                    ? pendingSolicitations
                    : null
                }
                <Text style={styles.title}>Solicitações aprovadas</Text>
                {
                    approvedSolicitations 
                    ? approvedSolicitations
                    : null
                }
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
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
    title: {
        alignSelf: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 20
    },
    image: {
        aspectRatio: 1,
        width: 100,
        height: 100,
        marginLeft: 15
    },
    volunteersButton: {
        backgroundColor: '#F2F9F8',
        marginVertical: 15
    },
    volunteersView: {
        flexDirection: 'row',
        marginVertical: 10
    },
    address: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 15
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 15
    },
});

const mapStateToProps = state => {
    const { user, volunteers } = state;
    return { user, volunteers };
}

export default connect(
    mapStateToProps,
    {
        dispatchVolunteersData: setVolunteersData,
        dispatchVolunteerDetailData: setVolunteerDetailData
    }
)(SolicitationsPage);