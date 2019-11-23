import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    ScrollView,
    Alert,
    Linking
} from 'react-native';

import api from '../config/api';
import Loading from '../components/Loading';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import Interests from '../components/Interests';
import SuccessAlert from '../components/SuccessAlert';
import SolicitationButton from '../components/SolicitationButton';
import openWhatsappChat from '../helpers/whatsapp';

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
        const { street, number, city, state, cellphone } = this.props.institutionDetail;
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
                        <Image
                            style={{height: 200, width: 200}}
                            source={require('../assets/no-image.png')}
                        />
                    </View>
                    {
                        this.state.solicitation && this.state.solicitation.approved == 1
                        ?  <TouchableOpacity
                                onPress={() => openWhatsappChat(cellphone)}
                                style={styles.button}
                            >
                                <Text>Whatsapp</Text>
                            </TouchableOpacity>
                        : null
                    }
                    <View>
                        <Text style={styles.name}>{fantasy}</Text>
                    </View>
                    <View>
                        <Text style={styles.text}>{street}, {number}</Text>
                    </View>
                    <View>
                        <Text style={styles.text}>{city} - {state}</Text>
                    </View>
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
    scroll: {
        marginTop: 10
    },
    container: {    
        justifyContent: 'center',
        alignItems: 'center'
    },
    name: {
        fontSize: 35
    },
    text: {
        fontSize: 20
    },
    subtitle: {
        fontSize: 30,
        marginTop: 20,
        marginBottom: 20
    },
    image: {
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
    const { institutionDetail, user } = state;
    return { institutionDetail, user };
};

export default connect(
    mapStateToProps
)(InstitutionDetailsPage);