import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image
} from 'react-native';
import { TouchableOpacity, TextInput } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import Loading from '../components/Loading';
import api from '../config/api';

class SolicitationRequestPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            solicitationText: '',
            isLoading: false
        }
    }

    onChangeTextHandler(solicitationText) {
        this.setState({solicitationText});
    }


    async sendRequest() {
        this.setState({isLoading: true});
        const { user, institutionDetail } = this.props;

        await api
            .post('solicitation/create', {
                id_volunteer: user.volunteer.id_volunteer,
                id_institution: institutionDetail.institution.id_institution,
                message: this.state.solicitationText
            })
            .then(response => {
                console.log(response.data.data);
                this.props.navigation.navigate('InstitutionDetailsPage', {register: true});
            })
            .catch(error => {
                console.log(error);
                this.setState({isLoading: false});
            })
    }
    

    render() {
        if (this.state.isLoading) {
            return (
                <View style={styles.container}>
                    <Loading />
                </View>
            )
        }

        return (
            <View>
                <View>
                    <Text style={styles.title}>Escreva abaixo o porquê deseja participar desta instituição.</Text>
                </View>
                <TextInput
                    style={styles.input}
                    onChangeText={solicitationText => this.onChangeTextHandler(solicitationText)}
                    inputValue={this.state.solicitationText}
                    multiline={true}
                    numberOfLines={4}
                />
                <TouchableOpacity 
                    style={styles.button} 
                    onPress={() => this.sendRequest()}
                >
                    <Text>Enviar solicitação</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    button: {
        marginHorizontal: 40,
        marginTop: 20,
        borderRadius: 10,
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        padding: 10,
    },
    input: {
        margin: 20,
        borderColor: 'blue',
        borderWidth: 1,
        padding: 10,
        height: 150,
        justifyContent: "flex-start"
    },
    title: {
        marginTop: 10,
        fontSize: 20,
        textAlign: 'center'
    }
});

const mapStateToProps = state => {
    const { institutionDetail } = state;
    return { institutionDetail, user };
};

export default connect(
    mapStateToProps
)(SolicitationRequestPage);