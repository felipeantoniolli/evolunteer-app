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
    setCellphoneData,
    setReasonData,
    setFantasyData,
    setCpfInstitutionData,
    setCnpjData,
    setAllUserData
} from '../actions/registerActions';
import { setUpdateData } from '../actions/userActions';

import api from '../config/api';

import Input from '../components/Input';
import Loading from '../components/Loading';
import MaskedInput from '../components/MaskedInput';
import {
    parseDocumentToNumber
} from '../helpers/parsers';

class InstitutionRegisterPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            editing: false,
            errors: null
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
                this.props.dispacthNumberData(text);
                break;
            case 'reference':
                this.props.dispacthReferenceData(text);
                break;
            case 'telephone':
                this.props.dispatchTelephoneData(text);
                break;
            case 'cellphone':
                this.props.dispatchCellphoneData(text);
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

    async convertFields() {
        const { telephone, cellphone, cep } = this.props.register;
        const { cpf, cnpj } = this.props.register.institution;

        let newTelephone = parseDocumentToNumber(telephone);
        let newCellphone = parseDocumentToNumber(cellphone);
        let newCep = parseDocumentToNumber(cep);

        let newCpf = parseDocumentToNumber(cpf);
        let newCnpj = parseDocumentToNumber(cnpj);

        this.props.dispatchTelephoneData(newTelephone);
        this.props.dispatchCellphoneData(newCellphone);
        this.props.dispatchCepData(newCep);

        this.props.dispatchCnpjData(newCnpj);
        this.props.dispatchCpfInstitutionData(newCpf);
    }

    async onPressButton() {
        this.setState({isLoading: true});

        await this.convertFields();

        let register = this.props.register;

        let url = '';
        if (this.state.editing) {
            url = '/user/update-institution';
        } else {
            url = '/user/register-institution';
        }

        await api
            .post(url, [
                    register
            ])
            .then(response => {
                if (this.state.editing) {
                    const user = response.data.data;

                    this.props.dispacthUpdateData(user);

                    Alert.alert(
                        'Sucesso',
                        'Dados alterado com sucesso :)',
                        [
                            {
                                text: 'OK', onPress: () => {
                                    this.props.navigation.goBack()
                                }
                            }
                        ]
                    );
                } else {
                    this.props.navigation.navigate('Login', {register: true});
                }
            })
            .catch(error => {
                const { errors } = error.response.data;
                this.setState({isLoading: false, errors});
                console.log(error.response);
                Alert.alert(
                    title="Alguns campos estão inválidos!"
                );
       });
    }

    componentDidMount() {
        this.props.dispatchClearData();

        if (this.props.navigation.getParam('editing')) {
            this.setState({editing: true});
            this.props.dispatchAllUserData(this.props.user);
        }
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
            cellphone,
            institution: {
                reason,
                fantasy,
                cpf,
                cnpj
            }
        } = this.props.register;
        const { errors } = this.state;
        
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
                            <Text style={styles.title}>
                                {
                                    this.state.editing
                                    ? "Editar Perfil"
                                    : "Registro da Instituição"
                                }
                            </Text>
                        </View>
                        <View style={styles.content}>
                            <Input
                                title={'Usuário'}
                                onChangeTextHandler={text => this.onChangeTextHandler('username', text)}
                                inputValue={username}
                                onSubmit={() => {
                                    this.state.editing
                                    ? this.emailInput.focus()
                                    :  this.passwordInput.focus()
                                }}
                                error={
                                    errors && errors.username
                                    ? errors.username
                                    : null
                                }
                            />
                           {
                                this.state.editing
                                ? null
                                :  <Input
                                        title={'Senha'}
                                        onChangeTextHandler={text => this.onChangeTextHandler('password', text)}
                                        inputValue={password}
                                        passwordField={true}
                                        reference={(input) => {this.passwordInput = input}}
                                        onSubmit={() => {this.emailInput.focus()}}
                                        error={
                                            errors && errors.password
                                            ? errors.password
                                            : null
                                        }
                                    />
                            }
                            <Input
                                title={'Email'}
                                onChangeTextHandler={text => this.onChangeTextHandler('email', text)}
                                inputValue={email}
                                reference={(input) => {this.emailInput = input}}
                                onSubmit={() => {this.reasonInput.focus()}}
                                error={
                                    errors && errors.email
                                    ? errors.email
                                    : null
                                }
                            />
                            <Input
                                title={'Razão Social'}
                                onChangeTextHandler={text => this.onChangeTextHandler('reason', text)}
                                inputValue={reason}
                                reference={(input) => {this.reasonInput = input}}
                                onSubmit={() => {this.fantasyInput.focus()}}
                                error={
                                    errors && errors.reason
                                    ? errors.reason
                                    : null
                                }
                            />
                            <Input
                                title={'Nome Fantasia'}
                                onChangeTextHandler={text => this.onChangeTextHandler('fantasy', text)}
                                inputValue={fantasy}
                                reference={(input) => {this.fantasyInput = input}}
                                error={
                                    errors && errors.fatansy
                                    ? errors.fatansy
                                    : null
                                }
                            />
                            <MaskedInput
                                title={'CPF'}
                                type={'cpf'}
                                onChangeTextHandler={text => this.onChangeTextHandler('cpfInstitution', text)}
                                inputValue={cpf}
                                error={
                                    errors && errors.cpf
                                    ? errors.cpf
                                    : null
                                }
                                keyboard={'numeric'}
                            />
                             <MaskedInput
                                type={'cnpj'}
                                title={'CNPJ'}
                                onChangeTextHandler={text => this.onChangeTextHandler('cnpj', text)}
                                inputValue={cnpj}
                                error={
                                    errors && errors.cnpj
                                    ? errors.cnpj
                                    : null
                                }
                                keyboard={'numeric'}
                            />
                            <MaskedInput
                                title={'Telefone'}
                                type={'cel-phone'}
                                options={{
                                    maskType: 'BRL',
                                    withDDD: true,
                                    dddMask: '(99) '
                                }}
                                onChangeTextHandler={text => this.onChangeTextHandler('telephone', text)}
                                inputValue={telephone}
                                error={
                                    errors && errors.telephone
                                    ? errors.telephone
                                    : null
                                }
                                keyboard={'numeric'}
                            />
                            <MaskedInput
                                title={'Celular'}
                                type={'cel-phone'}
                                options={{
                                    maskType: 'BRL',
                                    withDDD: true,
                                    dddMask: '(99) '
                                }}
                                onChangeTextHandler={text => this.onChangeTextHandler('cellphone', text)}
                                inputValue={cellphone}
                                error={
                                    errors && errors.cellphone
                                    ? errors.cellphone
                                    : null
                                }
                                keyboard={'numeric'}
                            />
                            <Input
                                title={'CEP'}
                                onChangeTextHandler={text => this.onChangeTextHandler('cep', text)}
                                inputValue={cep}
                                reference={(input) => {this.cepInput = input}}
                                onSubmit={() => {this.streetInput.focus()}}
                                error={
                                    errors && errors.cep
                                    ? errors.cep
                                    : null
                                }
                                keyboard={'numeric'}
                            />
                            <Input
                                title={'Rua'}
                                onChangeTextHandler={text => this.onChangeTextHandler('street', text)}
                                inputValue={street}
                                reference={(input) => {this.streetInput = input}}
                                onSubmit={() => {this.numberInput.focus()}}
                                error={
                                    errors && errors.street
                                    ? errors.street
                                    : null
                                }
                            />
                            <Input
                                title={'Número'}
                                onChangeTextHandler={text => this.onChangeTextHandler('number', text)}
                                inputValue={number}
                                reference={(input) => {this.numberInput = input}}
                                onSubmit={() => {this.complementInput.focus()}}
                                error={
                                    errors && errors.number
                                    ? errors.number
                                    : null
                                }
                            />
                            <Input
                                title={'Complemento'}
                                onChangeTextHandler={text => this.onChangeTextHandler('complement', text)}
                                inputValue={complement}
                                reference={(input) => {this.complementInput = input}}
                                onSubmit={() => {this.cityInput.focus()}}
                                error={
                                    errors && errors.complement
                                    ? errors.complement
                                    : null
                                }
                            />
                            <Input
                                title={'Cidade'}
                                onChangeTextHandler={text => this.onChangeTextHandler('city', text)}
                                inputValue={city}
                                reference={(input) => {this.cityInput = input}}
                                onSubmit={() => {this.stateInput.focus()}}
                                error={
                                    errors && errors.city
                                    ? errors.city
                                    : null
                                }
                            />
                            <Input
                                title={'Estado'}
                                onChangeTextHandler={text => this.onChangeTextHandler('state', text)}
                                inputValue={state}
                                reference={(input) => {this.stateInput = input}}
                                onSubmit={() => {this.referenceInput.focus()}}
                                error={
                                    errors && errors.state
                                    ? errors.state
                                    : null
                                }
                            />
                            <Input
                                title={'Referência'}
                                onChangeTextHandler={text => this.onChangeTextHandler('reference', text)}
                                inputValue={reference}
                                reference={(input) => {this.referenceInput = input}}
                                error={
                                    errors && errors.reference
                                    ? errors.reference
                                    : null
                                }
                            />
                            <View style={styles.content}>
                                <TouchableOpacity 
                                    style={styles.button}
                                    onPress={() => this.onPressButton()}
                                >
                                    <Text style={styles.textButton}>
                                        {
                                            this.state.editing
                                                ? "Confirmar Alterações"
                                                : "Cadastre-se"
                                        }
                                    </Text>
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
        marginHorizontal: 45,
        marginTop: 20,
        borderRadius: 10,
        alignItems: 'center',
        backgroundColor: '#FFA02D',
        padding: 10,
        marginBottom: 20
    },
    textButton: {
        fontWeight: 'bold',
        fontSize: 15
    }
});

const mapStateToProps = (state) => {
    const { register, user } = state;
    return { register, user };
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
        dispacthNumberData: setNumberData,
        dispacthReferenceData: setReferenceData,
        dispatchTelephoneData: setTelephoneData,
        dispatchCellphoneData: setCellphoneData,
        dispatchReasonData: setReasonData,
        dispatchFantasyData: setFantasyData,
        dispatchCpfInstitutionData: setCpfInstitutionData,
        dispatchCnpjData: setCnpjData,
        dispatchAllUserData: setAllUserData,
        dispacthUpdateData: setUpdateData
    }
)(InstitutionRegisterPage);