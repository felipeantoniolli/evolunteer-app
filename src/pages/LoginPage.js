import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Alert,
    KeyboardAvoidingView,
    AsyncStorage
} from 'react-native';

import { connect } from 'react-redux';
import { setDataLogin, setPasswordLogin } from '../actions/loginActions';
import { login, logout } from '../actions/userActions';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Loading from '../components/Loading';
import SuccessAlert from '../components/SuccessAlert';

import Input from '../components/Input';
import api from '../config/api';

class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false
        };
    }

    componentDidMount() {
        this.setState({isLoading: true});
        this._retrieveData();
    }

    _retrieveData = async () => {
        try {
            const token = await AsyncStorage.getItem('user_token');

            if (token) {
                api
                    .post('/user/find-token', {
                        token
                    })
                    .then(response => {
                        user = response.data.data;
                        this.props.dispatchUserLogin(user);
                        this.navigate();
                    })
                    .catch(error => {
                        this.setState({isLoading: false});
                        console.log(error);
                    })
            } else {
                this.setState({isLoading: false});
            }
        } catch (error) {
            this.setState({isLoading: false});
            this.props.dispatchUserLogout();
            console.log(error);
        }
    };

    onChangeTextHandler(field, text) {
        switch (field) {
            case 'data':
                this.props.dispatchDataLogin(text);
                break;
            case 'password':
                this.props.dispatchPasswordLogin(text);
                break;
            default:
                return;
        }
    }

    async tryLogin() {
        const { data, password } = this.props.login;

        this.setState({isLoading: true});

        if (!data || !password) {
            this.setState({isLoading: false});

            Alert.alert(
                text="Informe os dados de login!"
            );

            return;
        }

        await api
            .post('/user/login', {
                data: data,
                password: password
            })
            .then(response => {
                user = response.data.data;
                this.props.dispatchUserLogin(user);
                this.navigate();
            })
            .catch(error => {
                this.setState({isLoading: false});

                console.log(error);

                Alert.alert(
                    text="Login ou Senha inválidos!"
                );

                return;
            });
    }

    navigate() {
        const { image, interest, type } = this.props.user;

        if (!image) {
            this.props.navigation.navigate("UploadImage");
        } else if (interest.length > 0) {
            if (type == 1) {
                this.props.navigation.navigate("Volunteer");
            }

            if (type == 2) {
                this.props.navigation.navigate("Institution");
            }
        } else {
            this.props.navigation.navigate('InterestPage');
        }
    }

    render() {
        const { data, password } = this.props.login;
        
        if (this.props.navigation.getParam('register')) {
            var register = this.props.navigation.getParam('register');
        }

        if (this.state.isLoading) {
            return (
                <View style={styles.container}>
                    <Loading />
                </View>
            )
        }

        return (
            <View style={styles.container}>
                <KeyboardAvoidingView
                    behavior="padding"
                    enabled
                    keyboardVerticalOffset={100}
                >
                    {
                        register
                        ? <SuccessAlert message="Registrado com sucesso" />
                        : null
                    }
                    <View style={styles.content}>
                        <Text style={styles.title}>Faça seu login!</Text>
                    </View>
                    <Input 
                        title={'Usuário ou email'}
                        onChangeTextHandler={text => this.onChangeTextHandler('data', text)}
                        inputValue={data}
                        onSubmit={() => {this.passwordInput.focus()}}
                    />
                    <Input 
                        title={'Senha'}
                        reference={(input) => {this.passwordInput = input}}
                        onChangeTextHandler={text => this.onChangeTextHandler('password', text)}
                        inputValue={password}
                        returnKey="done"
                        passwordField={true}
                        onSubmit={() => this.tryLogin()}
                    />
                    <TouchableOpacity 
                        style={styles.button} 
                        onPress={() => this.tryLogin()}
                    >
                        <Text>Entrar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => this.props.navigation.navigate("RegisterPage")}
                    >
                        <Text>Faça seu cadastro</Text>
                    </TouchableOpacity>
                </KeyboardAvoidingView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    content: {
        marginTop: 15,
        alignItems: 'center'
    },
    input: {
        borderBottomColor: 'blue',
        borderBottomWidth: 1,
        width: 300
    },
    title: {
        fontSize: 40,
        marginBottom: 20
    },
    field: {
        fontSize: 20
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
    const { login, user } = state;
    return { login, user };
}

export default connect(
    mapStateToProps,
    {
        dispatchDataLogin: setDataLogin,
        dispatchPasswordLogin: setPasswordLogin,
        dispatchUserLogin: login,
        dispatchUserLogout: logout
    }
)(LoginPage);