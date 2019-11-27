import React from 'react';
import {
    View,
    Text,
    Alert,
    StyleSheet,
    ScrollView
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { connect } from 'react-redux';
import { logout } from '../actions/userActions';

import api from '../config/api';

import Interests from '../components/Interests';
import Birth from '../components/Birth';
import Loading from '../components/Loading';
import SolicitationsActionsButton from '../components/SolicitationsActionsButton';
import ProfileImage from '../components/ProfileImage';
import Whatsapp from '../components/Whatsapp';

class VolunteerDetailsPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false
        }
    }

    requestSolicitation(status = 1) {
        if (status == 1) {
            title = "Aceitar solicitação";
        }

        if (status == 2) {
            title = "Recusar solicitação";
        }

        if (status == 3) {
            title = "Cancelar aprovação";
        }

        Alert.alert(
            title,
            'Você tem certeza?',
            [
                {
                    text: 'Sim', onPress: () => this.changeStatusSolicitation(status)
                },
                {
                    text: 'Não',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                }
            ]
        )
    }

    async changeStatusSolicitation(status = 1) {
        this.setState({isLoading: true});

        const { id_solicitation } = this.props.volunteerDetail.solicitation;

        api
            .post('/solicitation/status-solicitation', {
                id_solicitation: id_solicitation,
                approved: status
            })
            .then(response => {
                var content = '';
                if (status == 1) {
                    content = "Solicitação aprovada com sucesso!";
                }

                if (status == 2) {
                    content = "Solicitação reprovada com sucesso!";
                }

                if (status == 3) {
                    content = "Solicitação cancelada com sucesso!";
                }

                Alert.alert(
                    'Sucesso',
                    content,
                    [
                        {
                            text: 'OK', onPress: () => {
                                this.props.navigation.navigate('SolicitationsPage', {refresh: true})
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
        const { volunteer, solicitation, state, city, interest, cellphone, image } = this.props.volunteerDetail;
        const { name, last_name, birth } = volunteer;

        if (this.state.isLoading) {
            return (
                <View style={styles.container}>
                    <Loading />
                </View>
            )
        }

        return (
            <ScrollView>
                <View style={styles.container}>
                    <View style={styles.image}>
                       <ProfileImage image={image} style={styles.profileImage} />
                    </View>
                    {
                        solicitation.approved == 1
                        ?  <Whatsapp cellphone={cellphone} />
                        : null
                    }
                    <View>
                         <Text style={styles.name}>{name}</Text>
                         <Text style={styles.lastName}>{last_name}</Text>
                    </View>
                    <View>
                        <Birth birth={birth} style={styles.text} />
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
                        <Interests interests={interest} style={styles.interest} />
                    </View>
                    <View style={styles.cardSolicitation}>
                        <Text style={styles.solicitationTitle}>
                            Mensagem de Solicitação
                        </Text>
                        <Text style={styles.message}>
                            {solicitation.message}
                        </Text>
                    </View>
                    <View style={styles.buttons}>
                        <SolicitationsActionsButton
                            approved={solicitation.approved}
                            onPressHandler={this.requestSolicitation.bind(this)}
                        />
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
        fontSize: 25,
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
    },
    button: {
        width: 145,
        marginHorizontal: 5,
        marginTop: 5,
        borderRadius: 10,
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#FFA02D'
    },
    cardSolicitation: {
        backgroundColor: "#F2F9F8",
        width: 300,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 10
    },
    solicitationTitle: {
        fontSize: 15,
        fontWeight: 'bold',
        marginVertical: 10
    },
    message: {
        fontSize: 13,
        padding: 8
    },
    buttons: {
        marginBottom: 10
    }
});

const mapStateToProps = state => {
    const { volunteerDetail } = state;
    return { volunteerDetail };
};

export default connect(
    mapStateToProps,
    {
        dispatchUserLogout: logout
    }
)(VolunteerDetailsPage);