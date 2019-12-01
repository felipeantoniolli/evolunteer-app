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
import Input from '../components/Input';
import Loading from '../components/Loading';
import api from '../config/api';

class ChangePasswordPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            last_password: null,
            new_password: null,
            repeat_password: null
        }
    }

    onChangeTextHandler(field, text) {
        this.setState({[field]: text});
    }

    onPressButton() {
        this.setState({isLoading: true});
        const { id_user } = this.props.user;
        const { last_password, new_password, repeat_password } = this.state;

        api
            .post('user/update-password', {
                'id_user': id_user,
                'last_password': last_password,
                'new_password': new_password,
                'repeat_password': repeat_password
            })
            .then(response => {
                Alert.alert(
                    'Sucesso',
                    'Senha alterada com sucesso :)',
                    [
                        {
                            text: 'OK', onPress: () => {
                                this.props.navigation.goBack()
                            }
                        }
                    ]
                );
                this.setState({isLoading: false});
            })
            .catch(error => {
                Alert.alert(
                    'Erro',
                    'Verifique os seus dados!',
                    [
                        {
                            text: 'OK'
                        }
                    ]
                );

                this.setState({isLoading: false});
            });
    }

    render() {
        const {
            last_password,
            repeat_password,
            new_password,
            isLoading
        } = this.state;
 
        if (isLoading) {
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
                                Alterar Senha
                            </Text>
                        </View>
                        <View style={styles.content}>
                            <Input
                                title={'Senha Antiga'}
                                onChangeTextHandler={text => this.onChangeTextHandler('last_password', text)}
                                inputValue={last_password}
                                passwordField={true}
                                reference={(input) => {this.lastPasswordInput = input}}
                                onSubmit={() => {this.newPasswordInput.focus()}}
                            />
                           <Input
                                title={'Nova Senha'}
                                onChangeTextHandler={text => this.onChangeTextHandler('new_password', text)}
                                inputValue={new_password}
                                passwordField={true}
                                reference={(input) => {this.newPasswordInput = input}}
                                onSubmit={() => {this.repeatPasswordInput.focus()}}
                            />
                            <Input
                                title={'Repetir Senha'}
                                onChangeTextHandler={text => this.onChangeTextHandler('repeat_password', text)}
                                inputValue={repeat_password}
                                passwordField={true}
                                reference={(input) => {this.repeatPasswordInput = input}}
                                onSubmit={() => {this.onPressButton()}}
                            />
                            <View style={styles.content}>
                                <TouchableOpacity 
                                    style={styles.button}
                                    onPress={() => this.onPressButton()}
                                >
                                    <Text style={styles.textButton}>
                                       Alterar Senha
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
        width: 300,
        marginHorizontal: 5,
        marginTop: 10,
        borderRadius: 10,
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#FFA02D'
    },
    textButton: {
        fontWeight: 'bold',
        fontSize: 15
    }
});

const mapStateToProps = (state) => {
    const { user } = state;
    return { user };
};

export default connect(
    mapStateToProps,
)(ChangePasswordPage);