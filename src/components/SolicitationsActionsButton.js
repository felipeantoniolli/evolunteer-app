import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Text, View, StyleSheet } from 'react-native';


const SolicitationsActionsButton = ({
        approved,
        onPressHandler
    }) => {
    if (approved == 1) {
        return (
        <TouchableOpacity 
            style={[styles.button, styles.buttonReprove]} 
            onPress={() => onPressHandler(3)}
        >
            <Text style={styles.text}>Cancelar Solicitação</Text>
        </TouchableOpacity>
        );
        
    }

    if (approved == 0)  {
        return (
            <View>
                <TouchableOpacity 
                    style={[styles.button, styles.buttonApprove]} 
                    onPress={() => onPressHandler(1)}
                >
                    <Text style={styles.text}>Aceitar Solicitação</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={[styles.button, styles.buttonReprove]} 
                    onPress={() => onPressHandler(2)}
                >
                    <Text style={styles.text}>Reprovar Solicitação</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return null;
}

const styles = StyleSheet.create({
    button: {
        marginHorizontal: 40,
        marginTop: 10,
        borderRadius: 10,
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        padding: 10
    },
    buttonApprove: {
        backgroundColor: '#A0D850',
        width: 300
    },
    buttonReprove: {
        backgroundColor: "#FF9E9E",
        width: 300
    },
    text: {
        color: "#000000",
        fontWeight: 'bold',
        fontSize: 15
    }
});

export default SolicitationsActionsButton;