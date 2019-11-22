import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    ScrollView
} from 'react-native';

import api from '../config/api';
import Loading from '../components/Loading';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import Interests from '../components/Interests';
import SuccessAlert from '../components/SuccessAlert';
import SolicitationButton from '../components/SolicitationButton';

class InstitutionDetailsPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            solicitation: []
        };
    }

    componentDidMount() {
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
                console.log(solicitation);
                this.setState({isLoading: false, solicitation});
            })
            .catch(error => {
                console.log(error);
                this.setState({isLoading: false});
            })
    }

    cancelSolicitation() {
        console.log('oi');
    }

    render() {
        const { street, number, city, state } = this.props.institutionDetail;
        const { fantasy } = this.props.institutionDetail.institution;
        const { interest } = this.props.institutionDetail;

        if (this.props.navigation.getParam('register')) {
            var register = this.props.navigation.getParam('register');
        }

        return (
            <ScrollView style={styles.scroll}>
                {
                    register
                    ? <SuccessAlert message="Solicitação enviada com sucesso :)" />
                    : null
                }
                <View style={styles.container}>
                    <View style={styles.image}>
                        <Image
                            style={{height: 200, width: 200}}
                            source={require('../assets/no-image.png')}
                        />
                    </View>
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
                        navigation={() => this.props.navigation.navigate("SolicitationRequestPage")}
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