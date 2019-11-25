import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import openWhatsappChat from '../helpers/whatsapp';

const Whatsapp = ({cellphone}) => {
    return (
        <TouchableOpacity
            onPress={() => openWhatsappChat(cellphone)}
            style={styles.button}
        >
            <Text>Whatsapp</Text>
        </TouchableOpacity>
    );
}

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

export default Whatsapp;
