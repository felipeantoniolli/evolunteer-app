import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Button
} from 'react-native';

export default class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: ''
        };
    }
    
    onChangeTextHandler(field, text) {
        this.setState({
            [field]: text
        });
    }

    onPressButton() {
        console.log(this.state);
        this.props.navigation.navigate('Home');
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.content}>
                    <Text style={styles.title}>Faça seu login!</Text>
                </View>
                <View style={styles.content}>  
                    <Text style={styles.field}>Usuário ou email</Text>
                </View>
                <View style={styles.content}>
                    <TextInput
                        style={styles.input}
                        onChangeText={text => this.onChangeTextHandler('email', text)}
                        value={this.state.email}
                    />
                </View>
                <View style={styles.content}>
                    <Text style={styles.field}>Senha</Text>
                </View>
                <View style={styles.content}>
                    <TextInput
                        style={styles.input}
                        onChangeText={text => this.onChangeTextHandler('password', text)}
                        value={this.state.password}
                        secureTextEntry
                    />
                </View>
                <View style={styles.content}>
                    <Button 
                        title="Entrar"
                        onPress={() => this.onPressButton()}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
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
        fontSize: 40,
        marginBottom: 20
    },
    field: {
        fontSize: 20
    }
});