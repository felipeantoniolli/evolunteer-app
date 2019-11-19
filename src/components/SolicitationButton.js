import React from 'react';
import Loading from '../components/Loading';
import { StyleSheet, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const SolicitationButton = ({isLoading, solicited, approved, navigation}) => {
    return (
        <TouchableOpacity 
            style={styles.button} 
            onPress={solicited ? null : navigation}
        >
            {
                isLoading
                ? <Loading size="small" />
                : solicited
                    ? approved
                        ? <Text>Aprovado</Text>
                        : <Text>Em análise</Text>
                    : <Text>Quero participar</Text>
            }
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        marginHorizontal: 40,
        marginTop: 20,
        borderRadius: 10,
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        padding: 10,
    } 
});

export default SolicitationButton;