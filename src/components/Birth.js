import React from 'react';
import { Text } from 'react-native';

const Birth = ({ birth, style }) => {
    return <Text style={style}>Idade: { getDate(birth) }</Text>;
}

const getDate = birth => {
    let now = new Date;
    let date = new Date(birth);

    let age = now.getFullYear() - date.getFullYear();

    if (date.getMonth > now.getMonth) {
        return age--;
    }

    if (date.getMonth && now.getMonth && date.getDay > now.getDay) {
        return age--;      
    }

    return age;
}

export default Birth;