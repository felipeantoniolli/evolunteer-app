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
import { TouchableOpacity } from 'react-native-gesture-handler';
import { setVolunteersData, setVolunteerDetailData } from '../actions/volunteersActions';

class SolicitationsPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            solicitations: []
        };
    }

    componentDidMount() {
        this.findPendingSolicitations();
    }

    navigateToVolunteerDetails(user) {
        this.props.dispatchVolunteerDetailData(user);
        this.props.navigation.navigate('InstitutionDetailsPage');
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
                solicitations = data.map(item => {
                    const { user } = item;

                    return (
                        <TouchableOpacity
                            style={styles.volunteersButton}
                            key={user.id_user}
                            onPress={() => console.log('ola')}
                        >
                            <View style={styles.volunteersView}>
                                <Image
                                    style={styles.image}
                                    source={require('../assets/no-image.png')}
                                />
                                <View style={{flexDirection: 'column'}}>
                                    <Text style={styles.name}>{user.volunteer.name} {user.volunteer.last_name}</Text>
                                    <Text style={styles.address}>{user.city} - {user.state}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    );
                });

                this.setState({isLoading: false});
                this.setState({solicitations});
            })
            .catch(error => {
                console.log(error);
                this.setState({isLoading: false});
            });
    }

    render() {
        const { solicitations } = this.state;
 
        if (this.state.isLoading) {
            return (
                <View style={styles.container}>
                    <Loading />
                </View>
            )
        }

        return (
            <ScrollView>
                {
                    solicitations 
                    ? solicitations
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