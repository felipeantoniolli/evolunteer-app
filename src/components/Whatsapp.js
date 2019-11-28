import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons'

import openWhatsappChat from '../helpers/whatsapp';

const Whatsapp = ({cellphone}) => {
    return (
        <TouchableOpacity
            onPress={() => openWhatsappChat(cellphone)}
            style={styles.button}
        >
            <FontAwesomeIcon style={styles.icon} size={ 30 } icon={faWhatsapp} />
            <Text style={styles.text}>Enviar mensagem</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        width: 300,
        marginHorizontal: 5,
        marginTop: 5,
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 60,
        backgroundColor: "#25D366",
        flexDirection: 'row'
    },
    icon: {
        color: "#FFFFFF"
    },
    text: {
        marginTop: 5,
        fontWeight: 'bold',
        fontSize: 15,
        marginLeft: 10,
        color: "#FFFFFF"
    }
})

export default Whatsapp;
