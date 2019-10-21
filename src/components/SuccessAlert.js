import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SuccessAlert = ({message = null}) => {
    return (
        <View style={styles.success}>
            <Text style={styles.text}>{message}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    success: {
        padding: 20,
        marginHorizontal: 20,
        alignItems: 'center',
        backgroundColor: '#98FB98'
    },
    text: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 15
    }
});

export default SuccessAlert;