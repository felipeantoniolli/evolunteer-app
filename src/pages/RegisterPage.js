import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native';

class RegisterPage extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.content}>
                    <Text style={styles.title}>Qual cadastro deseja realizar?</Text>
                </View>
                <View>
                    <TouchableOpacity 
                        style={styles.button} 
                        onPress={() => this.props.navigation.navigate('VolunteerRegisterPage')}
                    >
                        <Text>Voluntário</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity 
                            style={styles.button} 
                            onPress={() => this.props.navigation.navigate('InstitutionRegisterPage')}
                        >
                            <Text>Instituição</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity 
                        style={[styles.button, styles.backButton]} 
                        onPress={() => this.props.navigation.navigate('Login')}
                    >
                        <Text>Voltar</Text>
                    </TouchableOpacity>
                </View>
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
        marginHorizontal: 45,
        marginTop: 20,
        borderRadius: 10,
        alignItems: 'center',
        backgroundColor: '#FFD29C',
        padding: 10,
    },
    backButton: {
        backgroundColor: '#FF8C4A'
    }
});

export default RegisterPage;