import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Alert,
    Picker,
    KeyboardAvoidingView
} from 'react-native';

import { connect } from 'react-redux';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { setInterest } from '../actions/userActions';
import Loading from '../components/Loading';
import SuccessAlert from '../components/SuccessAlert';

import api from '../config/api';

class InterestPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            type: ''
        };
    }

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

    async setInterest() {
        this.setState({isLoading: true});

        if (this.state.type == 0) {
            this.setState({isLoading: false});
            return;
        }

        const { user } = this.props;

        api.
            post('/interest/insert', {
                id_user: user.id_user,
                type: this.state.type
            })
            .then(response => {
                const interest = response.data.data;
                this.props.dispatchDataInterest(interest);
                this.setState({isLoading: false});

                if (user.type == 1) {
                    this.props.navigation.navigate("Volunteer");
                } else if (user.type == 2) {
                    this.props.navigation.navigate("Institution");
                } else {
                    this.props.navigation.navigate("LoginPage");
                }
            })
            .catch(error => {
                console.log(error);
                this.setState({isLoading: false});
            })
    }

    render() {
        const { user } = this.props

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
                    <View style={styles.content}>
                        <Text style={styles.title}>
                            {
                                user.type == 1 
                                    ? "Selecione o seu interesse!"
                                    : "Selecione a sua área de atuação!"
                            }
                        </Text>
                    </View>
                    <View style={[styles.content, styles.pickerStyle]}>
                        <Picker
                            selectedValue={this.state.type}
                            style={styles.picker}
                            onValueChange={(itemValue) =>
                                this.setState({type: itemValue})
                            }
                            itemStyle={styles.pickerItem}
                        >   
                            <Picker.Item label="Selecionar..." value="0" />
                            <Picker.Item label="Crianças" value="1" />
                            <Picker.Item label="Animais" value="2" />
                            <Picker.Item label="Idosos" value="3" />
                        </Picker>
                    </View>
                    <TouchableOpacity 
                        style={styles.button} 
                        onPress={() => this.setInterest()}
                    >
                        <Text>Selecionar</Text>
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
    picker: {
        height: 50,
        width: 300
    },
    pickerItem: {
        textAlign: 'center'
    },
    pickerStyle: {
        borderWidth: 1,
        marginHorizontal: 50,
        borderColor: '#FFA02D',
        borderRadius: 5
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
        fontSize: 25,
        marginBottom: 20
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
    }
});

const mapStateToProps = state => {
    const { user } = state;
    return { user };
}

export default connect(
    mapStateToProps,
    {
        dispatchDataInterest: setInterest
    }
)(InterestPage);