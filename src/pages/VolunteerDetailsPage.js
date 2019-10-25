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
import { TouchableOpacity } from 'react-native-gesture-handler';
import Loading from '../components/Loading';
import api from '../config/api';

class VolunteerDetailsPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false
        }
    }

    requestAcceptSolicitation() {
        Alert.alert(
            'Aceitar Solicitação',
            'Você tem certeza?',
            [
                {
                    text: 'Sim', onPress: () => this.approveSolicitation()
                },
                {
                    text: 'Não',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                }
            ]
        )
    }

    async approveSolicitation() {
        this.setState({isLoading: true});

        const { id_solicitation } = this.props.volunteerDetail.solicitation;

        api
            .post('/solicitation/approve-solicitation', {
                id_solicitation: id_solicitation
            })
            .then(response => {
                Alert.alert(
                    'Sucesso',
                    'Solicitação aprovada com sucesso!',
                    [
                        {
                            text: 'Ok', onPress: () => {
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
        const { volunteer, solicitation, state, city, interest } = this.props.volunteerDetail;
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
                <TouchableOpacity 
                    style={styles.button} 
                    onPress={() => this.requestAcceptSolicitation()}
                >
                    <Text>Aceitar Solicitação</Text>
                </TouchableOpacity>
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
        padding: 10
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