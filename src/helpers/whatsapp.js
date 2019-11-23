import React from 'react';
import { Linking } from 'react-native';

const openWhatsappChat = (cellphone) => {
    Linking
        .openURL("https://wa.me/55" + cellphone)
        .catch(error => {
            console.log(error);
            Alert.alert(
                'Nao foi possível entrar no Whatsapp',
                [
                    {
                        text: 'OK'
                    }
                ]
            );
        });
}

export default openWhatsappChat;