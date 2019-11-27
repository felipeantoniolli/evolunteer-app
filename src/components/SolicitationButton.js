import React from 'react';
import Loading from '../components/Loading';
import { Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const SolicitationButton = ({
        isLoading,
        solicited,
        approved,
        onPressHandler,
        navigation
    }) => {

    let buttonColor = {backgroundColor: '#FFA02D'};

    if (!solicited) {
        buttonColor = {backgroundColor: '#FFA02D'};
    } else {
        switch (approved) {
            case 0:
                buttonColor = {backgroundColor: '#FFD29C'};
                break;
            case 1:
                buttonColor = {backgroundColor: '#9EAFFF'};
                break;
            case 2:
            case 3:
                buttonColor = {backgroundColor: '#FF9E9E'};
                break;
        }
    }

    return (
        <TouchableOpacity 
            style={[styles.button, buttonColor]} 
            onPress={(
                solicited
                ? onPressHandler
                : navigation
            )}
        >
            {
                isLoading
                ? <Loading size="small" />
                : (solicited)
                    ? approved
                        ? approved == 1
                         ? <Text style={styles.text}>Aprovado</Text>
                         : <Text style={styles.text}>Recusado</Text> 
                        : <Text style={styles.text}>Em análise</Text>
                    : <Text style={styles.text}>Quero participar</Text>
            }
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        width: 300,
        marginHorizontal: 5,
        marginTop: 10,
        borderRadius: 10,
        alignItems: 'center',
        padding: 10,
    },
    text: {
        fontWeight: 'bold',
        fontSize: 15
    }
});

export default SolicitationButton;