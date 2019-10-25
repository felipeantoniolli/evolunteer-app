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
        this.setState({isLoading: false});

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

                if (user.type == 1) {
                    this.props.navigation.navigate("Volunteer");
                }
    
                if (user.type == 2) {
                    this.props.navigation.navigate("Institution");
                }
            })
            .catch(error => {
                console.log(error);
                this.state({isLoading: false});
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
                                    ? "Escolha o seu interesse!"
                                    : "Escolha a sua área de atuação!"
                            }
                        </Text>
                    </View>
                    <View style={styles.content}>
                        <Picker
                            selectedValue={this.state.type}
                            style={{height: 50, width: 150}}
                            onValueChange={(itemValue) =>
                                this.setState({type: itemValue})
                            }
                        >   
                            <Picker.Item label="Escolha..." value="0" />
                            <Picker.Item label="Crianças" value="1" />
                            <Picker.Item label="Animais" value="2" />
                            <Picker.Item label="Idosos" value="3" />
                        </Picker>
                    </View>
                    <TouchableOpacity 
                        style={styles.button} 
                        onPress={() => this.setInterest()}
                    >
                        <Text>Escolher</Text>
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
        fontSize: 25,
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
    const { user } = state;
    return { user };
}

export default connect(
    mapStateToProps,
    {
        dispatchDataInterest: setInterest
    }
)(InterestPage);