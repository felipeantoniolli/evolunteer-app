import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Button
} from 'react-native';

class RegisterPage extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <View>
                    <Text>Qual cadastro deseja realizar?</Text>
                </View>
                <View>
                    <Button
                        title="Voluntário"
                        onPress={() => this.props.navigation.navigate('VolunteerRegisterPage')}
                    />
                </View>
                <View>
                    <Button
                        title="Instituição"
                        onPress={() => this.props.navigation.navigate('InstitutionRegisterPage')}
                    />
                </View>
                <View>
                    <Button
                        title="Voltar"
                        onPress={() => this.props.navigation.navigate('Login')}
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

export default RegisterPage;