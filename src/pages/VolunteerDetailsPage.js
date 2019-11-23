import React from 'react';
import {
    View,
    Text,
    Alert,
    StyleSheet,
    Image,
    ScrollView
} from 'react-native';
import { connect } from 'react-redux';
import { logout } from '../actions/userActions';
import Interests from '../components/Interests';
import Birth from '../components/Birth';
import Loading from '../components/Loading';
import { TouchableOpacity } from 'react-native-gesture-handler';
import api from '../config/api';
import SolicitationsActionsButton from '../components/SolicitationsActionsButton';
import openWhatsappChat from '../helpers/whatsapp';

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
        const { volunteer, solicitation, state, city, interest, cellphone } = this.props.volunteerDetail;
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
                        <Image
                            style={{height: 200, width: 200}}
                            source={require('../assets/no-image.png')}
                        />
                    </View>
                    {
                        solicitation.approved == 1
                        ?  <TouchableOpacity
                                onPress={() => openWhatsappChat(cellphone)}
                                style={styles.button}
                            >
                                <Text>Whatsapp</Text>
                            </TouchableOpacity>
                        : null
                    }
                    <View>
                        <Text style={styles.name}>{name} {last_name}</Text>
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
                    <View>
                        <Text style={styles.solicitation}>
                            Mensagem de Solicitação
                        </Text>
                        <Text style={styles.message}>
                            {solicitation.message}
                        </Text>
                    </View>
                </View>
                <SolicitationsActionsButton
                    approved={solicitation.approved}
                    onPressHandler={this.requestSolicitation.bind(this)}
                />
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10
    },
    name: {
        fontSize: 35
    },
    text: {
        fontSize: 20
    },
    message: {
        fontSize: 20,
        textAlign: 'center'
    },
    subtitle: {
        fontSize: 30,
        marginTop: 20,
        marginBottom: 20
    },
    solicitation: {
        fontSize: 28,
        marginTop: 20,
        marginBottom: 20
    },
    image: {
        flex: 1,
        justifyContent: 'center'
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
        marginHorizontal: 40,
        marginTop: 20,
        borderRadius: 10,
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        padding: 10,
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