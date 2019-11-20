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
                style={styles.button} 
                onPress={() => onPressHandler(3)}
            >
                <Text>Cancelar Aprovação</Text>
            </TouchableOpacity>
        );
        
    }

    if (approved == 0)  {
        return (
            <View>
                <TouchableOpacity 
                    style={styles.button} 
                    onPress={() => onPressHandler(1)}
                >
                    <Text>Aceitar Solicitação</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.button} 
                    onPress={() => onPressHandler(2)}
                >
                    <Text>Reprovar Solicitação</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return null;
}

const styles = StyleSheet.create({
    button: {
        marginHorizontal: 40,
        marginTop: 20,
        borderRadius: 10,
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        padding: 10
    }
});

export default SolicitationsActionsButton;