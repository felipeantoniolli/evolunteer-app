import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Alert
} from 'react-native';

import { connect } from 'react-redux';

import api from '../config/api';

import Interests from '../components/Interests';
import SolicitationButton from '../components/SolicitationButton';
import ProfileImage from '../components/ProfileImage';
import Whatsapp from '../components/Whatsapp';

class InstitutionDetailsPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            solicitation: false
        };
    }

    componentDidMount() {
        this.statusSolicitation();
    }

    statusSolicitation() {
        this.setState({isLoading: true});

        const { id_volunteer } = this.props.user.volunteer;
        const { id_institution } = this.props.institutionDetail.institution;

        api.
            post('/solicitation/find-by-user-and-institutuon', {
                id_volunteer,
                id_institution
            })
            .then(response => {
                var solicitation = response.data.data;
                this.setState({isLoading: false, solicitation});
            })
            .catch(error => {
                console.log(error);
                this.setState({isLoading: false});
            })
    }

    cancelSolicitation() {
        Alert.alert(
            'Cancelar solicitação',
            'Você tem certeza?',
            [
                {
                    text: 'Sim', onPress: () => this.confirmCancelSolicitation()
                },
                {
                    text: 'Não',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                }
            ]
        )
    }

    async confirmCancelSolicitation() {
        this.setState({isLoading: true});

        const { id_solicitation } = this.state.solicitation;

        await api
            .post('/solicitation/status-solicitation', {
                id_solicitation: id_solicitation,
                approved: '3'
            })
            .then(response => {
                Alert.alert(
                    'Sucesso',
                    'Solicitação cancelada com sucesso :)',
                    [
                        {
                            text: 'OK', onPress: () => {
                                if (this.props.navigation.getParam("volunteerPage")) {
                                    this.props.navigation.state.params = null;

                                    this.props.navigation.navigate(
                                        'SolicitationsVolunteerPage',
                                        {refresh: true}
                                    );
                                } else {
                                    this.props.navigation.navigate('SearchPage');
                                }
                            }
                        }
                    ]
                );
            })
            .catch(error => {
                console.log(error);
                this.setState({isLoading: false});
            })
    }

    render() {
        const { street, number, city, state, cellphone, image } = this.props.institutionDetail;
        const { fantasy } = this.props.institutionDetail.institution;
        const { interest } = this.props.institutionDetail;

        if (this.props.navigation.getParam('register')) {
            var register = this.props.navigation.getParam('register');
            this.props.navigation.state.params = null;
            Alert.alert(
                'Sucesso',
                'Solicitação enviada com sucesso :)'
            );

            this.statusSolicitation();
        }

        return (
            <ScrollView style={styles.scroll}>
                <View style={styles.container}>
                    <View style={styles.image}>
                        <ProfileImage image={image} style={styles.profileImage} />
                    </View>
                    {
                        this.state.solicitation && this.state.solicitation.approved == 1
                        ?  <Whatsapp
                                cellphone={cellphone}
                            />
                        : null
                    }
                    <SolicitationButton
                        isLoading={this.state.isLoading}
                        solicited={this.state.solicitation ? true : false}
                        approved={
                            this.state.solicitation 
                                ? this.state.solicitation.approved
                                : false
                            }
                        onPressHandler={() => this.cancelSolicitation()}
                        navigation={() => this.props.navigation.navigate("SolicitationRequestPage", {refresh: true})}
                    />
                    <View>
                        <Text style={styles.name}>{fantasy}</Text>
                    </View>
                    <View>
                        <Text style={styles.text}>{street}, {number}</Text>
                    </View>
                    <View>
                        <Text style={styles.text}>{city} - {state}</Text>
                    </View>
                    <View>
                        <Text style={styles.subtitle}>
                            Interesses
                        </Text>
                    </View>
                    <View>
                        {
                            interest
                            ? <Interests interests={interest} style={styles.interest} />
                            : null
                        }
                    </View>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    name: {
        marginTop: 10,
        alignSelf: 'center',
        fontSize: 35,
    },
    lastName: {
        alignSelf: 'center',
        fontSize: 30,
        marginBottom: 10
    },
    text: {
        fontSize: 20
    },
    subtitle: {
        fontSize: 30,
        marginTop: 10,
        color: '#FFA02D'
    },
    image: {
        justifyContent: 'center',
        marginTop: 20
    },
    profileImage: {
        height: 270,
        width: 270,
        borderRadius: 20
    },
    content: {
        flex: 1
    },
    title: {
        fontSize: 40,
        marginBottom: 20
    },
    interest: {
        fontSize: 20,
        justifyContent: 'center'
    }
});

const mapStateToProps = state => {
    const { institutionDetail, user } = state;
    return { institutionDetail, user };
};

export default connect(
    mapStateToProps
)(InstitutionDetailsPage);