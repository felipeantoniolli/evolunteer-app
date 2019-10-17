import React from 'react';
import {
    View,
    Text,
    Button,
    StyleSheet
} from 'react-native';

export default class HomePage extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Bem vindo!</Text>
                <Button 
                    title="Deslogar"
                    onPress={() => this.props.navigation.navigate('Login')}
                />
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
    title: {
        fontSize: 40,
        marginBottom: 20
    }
});