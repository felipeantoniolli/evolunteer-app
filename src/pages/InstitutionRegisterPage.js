import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Alert,
    KeyboardAvoidingView
} from 'react-native';
import { connect } from 'react-redux';

import api from '../config/api';
import {
    clearData,
    setTypeData,
    setUsernameData,
    setEmailData,
    setPasswordData,
    setCityData,
    setStreetData,
    setCepData,
    setStateData,
    setComplementData,
    setNumberData,
    setReferenceData,
    setTelephoneData,
    setReasonData,
    setFantasyData,
    setCpfInstitutionData,
    setCnpjData
} from '../actions/registerActions';
import Input from '../components/Input';
import Loading from '../components/Loading';
class InstitutionRegisterPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false
        };
    }

    onChangeTextHandler(field, text) {
        switch (field) {
            case 'username':
                this.props.dispatchUsernameData(text);
                break;
            case 'password':
                this.props.dispatchPasswordData(text);
                break;
            case 'email':
                this.props.dispatchEmailData(text);
                break;
            case 'cep':
                this.props.dispatchCepData(text);
                break;
            case 'street':
                this.props.dispatchStreetData(text);
                break;
            case 'city':
                this.props.dispatchCityData(text);
                break;
            case 'state':
                this.props.dispatchStateData(text);
                break;
            case 'complement':
                this.props.dispatchComplementData(text);
                break;
            case 'number':
                this.props.dispatcthNumberData(text);
                break;
            case 'reference':
                this.props.dispatcthReferenceData(text);
                break;
            case 'telephone':
                this.props.dispatchTelephoneData(text);
                break;
            case 'reason':
                this.props.dispatchReasonData(text);
                break;
            case 'fantasy':
                this.props.dispatchFantasyData(text);
                break;
            case 'cpfInstitution':
                this.props.dispatchCpfInstitutionData(text);
                break;
            case 'cnpj':
                this.props.dispatchCnpjData(text);
                break;
            default:
                return;
        }
    }

    async onPressButton() {
        this.setState({isLoading: true});
        let register = this.props.register;

        await api
           .post('user/register-institution',[
                register
           ])
           .then(response => {
               this.props.navigation.navigate('Login', {register: true});
           })
           .catch(error => {
            this.setState({isLoading: false});
               Alert.alert(
                   title="Alguns campos estão inválidos!"
               );
           });
    }

    componentDidMount() {
        this.props.dispatchClearData();
    }

    render() {
        const {
            username,
            type,
            email,
            password,
            cep,
            street,
            city,
            state,
            complement,
            number,
            reference,
            telephone,
            institution: {
                reason,
                fantasy,
                cpf,
                cnpj
            }
        } = this.props.register;

        
        if (this.state.isLoading) {
            return (
                <View style={styles.container}>
                    <Loading />
                </View>
            )
        }

        return (
            <KeyboardAvoidingView 
                style={styles.teste}
                behavior="padding"
                keyboardVerticalOffset={100}
                enabled
            >
                <ScrollView>
                    <View style={styles.container}>
                        <View>
                            <Text style={styles.title}>Registro do Voluntário</Text>
                        </View>
                        <View style={styles.content}>
                            <Input
                                title={'Usuário'}
                                onChangeTextHandler={text => this.onChangeTextHandler('username', text)}
                                inputValue={username}
                                onSubmit={() => {this.passwordInput.focus()}}
                            />
                            <Input
                                title={'Senha'}
                                onChangeTextHandler={text => this.onChangeTextHandler('password', text)}
                                inputValue={password}
                                passwordField={true}
                                reference={(input) => {this.passwordInput = input}}
                                onSubmit={() => {this.emailInput.focus()}}
                            />
                            <Input
                                title={'Email'}
                                onChangeTextHandler={text => this.onChangeTextHandler('email', text)}
                                inputValue={email}
                                reference={(input) => {this.emailInput = input}}
                                onSubmit={() => {this.reasonInput.focus()}}
                            />
                            <Input
                                title={'Razão'}
                                onChangeTextHandler={text => this.onChangeTextHandler('reason', text)}
                                inputValue={reason}
                                reference={(input) => {this.reasonInput = input}}
                                onSubmit={() => {this.fantasyInput.focus()}}
                            />
                            <Input
                                title={'Nome Fantasia'}
                                onChangeTextHandler={text => this.onChangeTextHandler('fantasy', text)}
                                inputValue={fantasy}
                                reference={(input) => {this.fantasyInput = input}}
                                onSubmit={() => {this.cpfInput.focus()}}
                            />
                            <Input
                                title={'CPF'}
                                onChangeTextHandler={text => this.onChangeTextHandler('cpf', text)}
                                inputValue={cpf}
                                reference={(input) => {this.cpfInput = input}}
                                onSubmit={() => {this.cnpjInput.focus()}}
                            />
                            <Input
                                title={'CNPJ'}
                                onChangeTextHandler={text => this.onChangeTextHandler('cnpj', text)}
                                inputValue={cnpj}
                                reference={(input) => {this.cnpjInput = input}}
                                onSubmit={() => {this.telephoneInput.focus()}}
                            />
                            <Input
                                title={'Telefone'}
                                onChangeTextHandler={text => this.onChangeTextHandler('telephone', text)}
                                inputValue={telephone}
                                reference={(input) => {this.telephoneInput = input}}
                                onSubmit={() => {this.cepInput.focus()}}
                            />
                            <Input
                                title={'CEP'}
                                onChangeTextHandler={text => this.onChangeTextHandler('cep', text)}
                                inputValue={cep}
                                reference={(input) => {this.cepInput = input}}
                                onSubmit={() => {this.streetInput.focus()}}
                            />
                            <Input
                                title={'Rua'}
                                onChangeTextHandler={text => this.onChangeTextHandler('street', text)}
                                inputValue={street}
                                reference={(input) => {this.streetInput = input}}
                                onSubmit={() => {this.numberInput.focus()}}
                            />
                            <Input
                                title={'Número'}
                                onChangeTextHandler={text => this.onChangeTextHandler('number', text)}
                                inputValue={number}
                                reference={(input) => {this.numbernput = input}}
                                onSubmit={() => {this.complementInput.focus()}}
                            />
                            <Input
                                title={'Complemento'}
                                onChangeTextHandler={text => this.onChangeTextHandler('complement', text)}
                                inputValue={complement}
                                reference={(input) => {this.complementInput = input}}
                                onSubmit={() => {this.cityInput.focus()}}
                            />
                            <Input
                                title={'Cidade'}
                                onChangeTextHandler={text => this.onChangeTextHandler('city', text)}
                                inputValue={city}
                                reference={(input) => {this.cityInput = input}}
                                onSubmit={() => {this.stateInput.focus()}}
                            />
                            <Input
                                title={'Estado'}
                                onChangeTextHandler={text => this.onChangeTextHandler('state', text)}
                                inputValue={state}
                                reference={(input) => {this.stateInput = input}}
                                onSubmit={() => {this.referenceInput.focus()}}
                            />
                            <Input
                                title={'Referência'}
                                onChangeTextHandler={text => this.onChangeTextHandler('reference', text)}
                                inputValue={reference}
                                reference={(input) => {this.referenceInput = input}}
                            />
                            <View style={styles.content}>
                                <TouchableOpacity 
                                    style={styles.button}
                                    onPress={() => this.onPressButton()}
                                >
                                    <Text>Cadastre-se</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </ScrollView>
        </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    teste: {
        paddingBottom: 20
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    content: {
        marginTop: 15
    },
    input: {
        borderBottomColor: 'blue',
        borderBottomWidth: 1,
        width: 300
    },
    title: {
        marginTop: 20,
        fontSize: 30,
        marginBottom: 10
    },
    field: {
        fontSize: 20
    },
    button: {
        marginVertical: 20,
        borderRadius: 10,
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        padding: 10
    }
});

const mapStateToProps = (state) => {
    const { register } = state;
    return { register };
};

export default connect(
    mapStateToProps,
    {
        dispatchClearData: clearData,
        dispatchTypeData: setTypeData,
        dispatchUsernameData: setUsernameData,
        dispatchEmailData: setEmailData,
        dispatchPasswordData: setPasswordData,
        dispatchCepData: setCepData,
        dispatchStreetData: setStreetData,
        dispatchCityData: setCityData,
        dispatchStateData: setStateData,
        dispatchComplementData: setComplementData,
        dispatcthNumberData: setNumberData,
        dispatcthReferenceData: setReferenceData,
        dispatchTelephoneData: setTelephoneData,
        dispatchReasonData: setReasonData,
        dispatchFantasyData: setFantasyData,
        dispatchCpfInstitutionData: setCpfInstitutionData,
        dispatchCnpjData: setCnpjData
    }
)(InstitutionRegisterPage);