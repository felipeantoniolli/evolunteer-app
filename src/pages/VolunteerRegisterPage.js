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
    setNameData,
    setLastnameData,
    setCpfData,
    setRgData,
    setBirthData,
    setGenderData,
    setAllUserData
} from '../actions/registerActions';
import { setUpdateData } from '../actions/userActions';

class VolunteerRegisterPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            editing: false
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
            case 'name':
                this.props.dispatchNameData(text);
                break;
            case 'last_name':
                this.props.dispatchLastnameData(text);
                break;
            case 'cpf':
                this.props.dispatchCpfData(text);
                break;
            case 'rg':
                this.props.dispatchRgData(text);
                break;
            case 'birth':
                this.props.dispatchBirthData(text);
                break;
            case 'gender':
                this.props.dispatchGenderData(text);
                break;
            default:
                return;
        }
    }

    componentDidMount() {
        this.props.dispatchClearData();

        if (this.props.navigation.getParam('editing')) {
            this.setState({editing: true});
            this.props.dispatchAllUserData(this.props.user);
        }
    }

    async onPressButton() {
        this.setState({isLoading: true});
        let register = this.props.register;
        
        let url = '';
        if (this.state.editing) {
            url = '/user/update-volunteer';
        } else {
            url = '/user/register-volunteer';
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
            console.log(error);
            this.setState({isLoading: false});
               Alert.alert(
                   title="Alguns campos estão inválidos!"
               );
           });
    }

    render() {
        let {
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
            volunteer: {
                name,
                last_name,
                cpf,
                rg,
                birth,
                gender
            }
        } = this.props.register;

        if (gender == 1) {
            gender = "1";
        }

        if (gender == 2) {
            gender = "2";
        }

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
                                    : "Registro do Voluntário"
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
                                    />
                            }
                            <Input
                                title={'Email'}
                                onChangeTextHandler={text => this.onChangeTextHandler('email', text)}
                                inputValue={email}
                                reference={(input) => {this.emailInput = input}}
                                onSubmit={() => {this.nameInput.focus()}}
                            />
                            <Input
                                title={'Nome'}
                                onChangeTextHandler={text => this.onChangeTextHandler('name', text)}
                                inputValue={name}
                                reference={(input) => {this.nameInput = input}}
                                onSubmit={() => {this.lastNameInput.focus()}}
                            />
                            <Input
                                title={'Sobrenome'}
                                onChangeTextHandler={text => this.onChangeTextHandler('last_name', text)}
                                inputValue={last_name}
                                reference={(input) => {this.lastNameInput = input}}
                                onSubmit={() => {this.cpfInput.focus()}}
                            />
                            <Input
                                title={'CPF'}
                                onChangeTextHandler={text => this.onChangeTextHandler('cpf', text)}
                                inputValue={cpf}
                                reference={(input) => {this.cpfInput = input}}
                                onSubmit={() => {this.rgInput.focus()}}
                            />
                            <Input
                                title={'RG'}
                                onChangeTextHandler={text => this.onChangeTextHandler('rg', text)}
                                inputValue={rg}
                                reference={(input) => {this.rgInput = input}}
                                onSubmit={() => {this.telephoneInput.focus()}}
                            />
                            <Input
                                title={'Telefone'}
                                onChangeTextHandler={text => this.onChangeTextHandler('telephone', text)}
                                inputValue={telephone}
                                reference={(input) => {this.telephoneInput = input}}
                                onSubmit={() => {this.birthInput.focus()}}
                            />
                            <Input
                                title={'Data de nascimento'}
                                onChangeTextHandler={text => this.onChangeTextHandler('birth', text)}
                                inputValue={birth}
                                reference={(input) => {this.birthInput = input}}
                                onSubmit={() => {this.genderInput.focus()}}
                            />
                            <Input
                                title={'Gênero'}
                                onChangeTextHandler={text => this.onChangeTextHandler('gender', text)}
                                inputValue={gender}
                                reference={(input) => {this.genderInput = input}}
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
                                reference={(input) => {this.numberInput = input}}
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
                                    <Text>
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
        marginVertical: 20,
        borderRadius: 10,
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        padding: 10
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
        dispatcthNumberData: setNumberData,
        dispatcthReferenceData: setReferenceData,
        dispatchTelephoneData: setTelephoneData,
        dispatchNameData: setNameData,
        dispatchLastnameData: setLastnameData,
        dispatchCpfData: setCpfData,
        dispatchRgData: setRgData,
        dispatchBirthData: setBirthData,
        dispatchGenderData: setGenderData,
        dispatchAllUserData: setAllUserData,
        dispacthUpdateData: setUpdateData
    }
)(VolunteerRegisterPage);